import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./DashBoard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminProduct } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";

const DashBoard = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { products } = useSelector((state) => state.products);
  const { order } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  order && order.forEach((item) => (totalAmount += item.totalPrice));

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgba(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className='dashboard'>
      <SideBar />

      <div className='dashboardContainer'>
        <Typography component='h1'>DashBoard</Typography>

        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount <br /> Rs.{totalAmount}
            </p>
          </div>
        </div>

        <div className='dashboardSummaryBox2'>
          <Link to='/admin/products'>
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>

          <Link to='/admin/orders'>
            <p>Orders</p>
            <p>{order && order.length}</p>
          </Link>

          <Link to='/admin/users'>
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>

        <div className='lineChart'>
          <Line data={lineState} />
        </div>

        <div className='doughnutChart'>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
