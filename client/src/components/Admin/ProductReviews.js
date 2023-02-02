import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { MdDelete, MdStar } from "react-icons/md";
import SideBar from "./SideBar";
import { Button } from "@material-ui/core";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    // dispatch(getAllReviews());
  }, [dispatch, alert, error, isDeleted, deleteError, history, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }>
              <MdDelete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className='dashboard'>
        <SideBar />

        <div className='productReviewContainer'>
          <form
            className='productReviewsForm'
            onSubmit={productReviewSubmitHandler}>
            <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

            <div>
              <MdStar />
              <input
                type='text'
                placeholder='Name'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id='productReviewBtn'
              type='submit'
              disabled={
                loading ? true : false || productId === "" ? true : false
              }>
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            />
          ) : (
            <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
