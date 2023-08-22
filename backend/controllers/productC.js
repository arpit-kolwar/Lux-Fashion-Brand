const Product = require("../Models/Product");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const getAthletics = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: "athletics" });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const getEyewears = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: "eyewears" });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const getCollections = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: "collections" });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!product) return res.send("product not found");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAthletics,
  getCollections,
  getEyewears,
};
