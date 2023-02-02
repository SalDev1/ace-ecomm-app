import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import { clearErrors, createOrder } from "../../actions/orderActions";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const [apiKey, setApiKey] = useState("");

  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setApiKey(data.stripeApiKey);
  };

  console.log(apiKey);

  useEffect(() => {
    getStripeKey();
  }, []);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  console.log(shippingInfo);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    paymentInfo: "",
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    itemsPrice: orderInfo.subtotal,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      console.log(result);

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("Here's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title='Payment' />
      <CheckoutSteps activeStep={2} />

      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <MdCreditCard />
            <CardNumberElement className='paymentInput' />
          </div>

          <div>
            <MdEvent />
            <CardExpiryElement className='paymentInput' />
          </div>

          <div>
            <MdVpnKey />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`Pay Rs.${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
