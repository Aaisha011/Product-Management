const express = require ("express");
const router = express.Router();

const {addProduct, getProduct, getAllProducts, deleteProduct} = require("../controllers/productController");
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware");

// Add product
router.post("/products", authMiddleware, adminMiddleware, addProduct);
console.log("product route")

// get all products
router.get("/products", getAllProducts);

// get a single product with ID
router.get("/products/:id", authMiddleware, adminMiddleware, getProduct);

// delete single product with Id
router.delete("/products/:id",authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;