const Product = require("../models/product");

// Add product
exports.addProduct = async (req, res) => {
    try {
      console.log("Received Request Body:", req.body); 
  
      const { name, price, category, isStock} = req.body;
  
      if (!name || !price || !category || !isStock) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const product = await Product.create({ name, price, category });
      res.status(201).json({ message: "Product added successfully", product });
  
    } catch (err) {
      res.status(500).json({ message: "Error adding product", error: err.message });
    }
  };
  
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log('req')
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get product
exports.getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);  // ✅ Corrected response
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
