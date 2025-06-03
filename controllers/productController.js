const Product = require('../models/Product');

// Dodavanje novog proizvoda
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dodavanja proizvoda", error: err.message });
  }
};

// Dohvatanje svih proizvoda sa opcionalnim filterima
const getAllProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice } = req.query;

    let filter = {};

    // Pretraga po imenu (case-insensitive)
    if (keyword) {
      filter.name = { $regex: keyword, $options: 'i' };
    }

    // Filtriranje po cenovnom opsegu
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja proizvoda", error: err.message });
  }
};


// Dohvatanje jednog proizvoda
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja proizvoda", error: err.message });
  }
};

// Ažuriranje proizvoda
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom ažuriranja proizvoda", error: err.message });
  }
};

// Brisanje proizvoda
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }
    res.status(200).json({ message: "Proizvod uspešno obrisan" });
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom brisanja proizvoda", error: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
