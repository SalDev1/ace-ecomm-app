import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./Products.css";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  console.log(filteredProductsCount);
  console.log(resultPerPage);
  console.log(products.length);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      console.log(error);

      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='PRODUCTS -- ACE' />
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />

            <div className='categorySpace'></div>
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((category) => (
                <li
                  className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component='legend'>Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelling='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className='pagination'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
