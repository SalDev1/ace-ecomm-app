import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import "./Header.css";

const options = {
  burgerColorHover: "lightseagreen",
  burgerColor: "lightseagreen",
  logo,
  logoWidth: "50vmax",
  navColor1: "rgb(255,255,255,0.8)",
  logoHoverSize: "10px",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "lightseagreen",
  link1Margin: "1vmax",
  profileIcon: true,
  profileIconUrl: "/login",
  profileIconColor: "rgb(35,35,35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "rgb(35,35,35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgb(35,35,35,0.8)",
  CartIconElement: MdShoppingCart,
  profileIconColorHover: "lightseagreen",
  searchIconColorHover: "lightseagreen",
  cartIconColorHover: "lightseagreen",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} className='logoReactNavBar' />;
};

export default Header;
