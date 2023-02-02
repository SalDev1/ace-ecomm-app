import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import {
  MdPinDrop,
  MdPublic,
  MdLocationCity,
  MdPhone,
  MdHome,
  MdPublicOff,
  MdTransferWithinAStation,
} from "react-icons/md";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import "./Shipping.css";
import CheckOutSteps from "./CheckoutSteps";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  //   console.log(state.cart.cartItems);

  console.log(shippingInfo);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Details"} />

      <CheckOutSteps activeStep={0} />

      <div className='shippingContainer'>
        <div className='shippingBox'>
          <h2 className='shippingHeading'>Shipping Details</h2>

          <form
            className='shippingForm'
            encType='multipart/form'
            onSubmit={shippingSubmit}>
            <div>
              <MdHome />
              <input
                type='text'
                placeholder='Address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <MdLocationCity />
              <input
                type='text'
                placeholder='City'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MdPinDrop />
              <input
                type='text'
                placeholder='Pin Code'
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <MdPhone />
              <input
                type='text'
                placeholder='Phone No'
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size='10'
              />
            </div>

            <div>
              <MdPublicOff />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}>
                <option value=''>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <MdTransferWithinAStation />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}>
                  <option value=''>State</option>

                  {/* Getting all the states for a specific country */}
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type='submit'
              value='Continue'
              className='shippingBtn'
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
