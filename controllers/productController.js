import productModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

// Create Product --> Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    // Pushing all the images in the cloudinary folder.
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    // After getting the links of the image from the cloud folder ,
    // store them in the database.
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products.
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await productModel.countDocuments();

  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
// Get All Products (Admin)
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productModel.find();

  res.status(201).json({
    success: true,
    products,
  });
});

// Get single product
// next ==> It passes control to the next matching route.
export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product => Admin.
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  //Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary.
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  }
  const imagesLinks = [];

  for (let i = 0; i < images?.length; i++) {
    // Pushing all the images in the cloudinary folder.
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    // After getting the links of the image from the cloud folder ,
    // store them in the database.
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
    req.body.images = imagesLinks;
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }
  // Deleting Images from Cloudinary.
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create new review or update review.
export const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() == req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  // Find the average of the all reviews of a certain product.
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a product.
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review.
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // We are going to find all the reviews that we want to keep it and delete
  // the one that we don't need it.
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
