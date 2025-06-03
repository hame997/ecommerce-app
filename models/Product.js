const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Uklanja razmake sa početka i kraja
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Cena ne može biti negativna
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  image: {
    type: String // Putanja do slike proizvoda
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
