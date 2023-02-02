import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import "./NewProduct.css";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import {
  MdAccountTree,
  MdDescription,
  MdStorage,
  MdSpellcheck,
  MdAttachMoney,
} from "react-icons/md";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import SideBar from "./SideBar";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    isUpdated,
    loading,
    error: updateError,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  console.log(product);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully.");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductFormSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    // Array.form creates a copy of the array.
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // This function helps us adding more images to it.
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title='Update Product' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={updateProductFormSubmitHandler}>
            <h1>Update Product</h1>

            <div>
              <MdSpellcheck />
              <input
                type='text'
                placeholder='Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type='number'
                placeholder='Price'
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <MdDescription />

              <textarea
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols='30'
                rows='1'></textarea>
            </div>

            <div>
              <MdAccountTree />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <MdStorage />
              <input
                type='number'
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id='createProductFormImage'>
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt='Old Product Preview' />
                ))}
            </div>
            <div id='createProductFormImage'>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt='Product Preview' />
              ))}
            </div>

            <Button
              id='createProductBtn'
              type='submit'
              disabled={loading ? true : false}>
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
