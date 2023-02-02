import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import React, { useEffect, useState } from "react";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Admin/DashBoard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenicated, user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  console.log(window.location.pathname.length);

  const [stripeApiKey, setStripeApiKey] = useState("");
  console.log(shippingInfo);

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
    console.log(window.location.pathname);
  }, [stripeApiKey]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  // console.log(stripeApiKey);

  return (
    <Router>
      <Header />

      {isAuthenicated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path='/process/payment' component={Payment} />
        </Elements>
      )}

      {/* Switch helps you to render things one at the time. */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/products' component={Products} />
        <Route path='/products/:keyword' component={Products} />

        <Route exact path='/search' component={Search} />

        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <ProtectedRoute exact path='/account' component={Profile} />

        <ProtectedRoute exact path='/me/update' component={UpdateProfile} />

        <ProtectedRoute
          exact
          path='/password/update'
          component={UpdatePassword}
        />
        <Route exact path='/password/forgot' component={ForgotPassword} />
        <Route exact path='/password/reset/:token' component={ResetPassword} />
        <Route exact path='/login' component={LoginSignUp} />
        <Route exact path='/cart' component={Cart} />
        <ProtectedRoute exact path='/shipping' component={Shipping} />
        <ProtectedRoute exact path='/success' component={OrderSuccess} />
        <ProtectedRoute exact path='/orders' component={MyOrders} />
        <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />
        <ProtectedRoute exact path='/order/:id' component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path='/admin/dashboard'
          component={DashBoard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path='/admin/products'
          component={ProductList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path='/admin/product'
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path='/admin/product/:id'
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path='/admin/orders'
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path='/admin/order/:id'
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path='/admin/users'
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path='/admin/user/:id'
          isAdmin={true}
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          path='/admin/reviews'
          isAdmin={true}
          component={ProductReviews}
        />

        {/* It's version error */}
        {/* <Route
          component={
            window.location.pathname === "/process/payment"
              ? NotFound
              : NotFound
          }
        /> */}
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
