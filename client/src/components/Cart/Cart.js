import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsfromCart } from "../../actions/cartActions";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increasedQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreasedQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const item = {
    product: "Product1d",
    price: 200,
    name: "salman",
    quantity: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1VNTUdk_ceO_9g1BtignDS9zxwOQlNIaq0krP1pb&s",
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsfromCart(id));
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <MdRemoveShoppingCart />

          <Typography>No Product in Your Cart</Typography>
          <Link to='/products'>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className='cartContainer' key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />

                  <div className='cartInput'>
                    <button
                      onClick={() => {
                        decreasedQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        );
                      }}>
                      -
                    </button>
                    <input type='number' readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increasedQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }>
                      +
                    </button>
                  </div>

                  <p className='cartSubTotal'>{`Rs.${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className='cartGrossTotal'>
              <div></div>
              <div className='cartGrossTotalBox'>
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>

              <div></div>
              <div className='checkOutBtn'>
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
