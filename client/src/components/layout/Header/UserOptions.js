import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {
  MdDashboard,
  MdExitToApp,
  MdPerson,
  MdListAlt,
  MdShoppingCart,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <MdListAlt />, name: "Orders", func: orders },
    { icon: <MdPerson />, name: "Profile", func: account },
    {
      icon: (
        <MdShoppingCart
          style={{ color: cartItems.length > 0 ? "lightseagreen" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        ariaLabel='SpeedDial tooltip example'
        open={open}
        style={{ zIndex: "11" }}
        className='speedDial'
        direction='down'
        icon={
          <img
            className='speedDialIcon'
            src={user?.avatar?.url ? user?.avatar?.url : "/Profile.png"}
            alt='Profile'
          />
        }>
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
