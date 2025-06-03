const Wishlist = require('../models/WishList');
const Product = require('../models/Product');

// Dodaj proizvod na listu želja
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Provjeri da li proizvod postoji
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Provjeri da li korisnik već ima listu želja
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      // Ako lista želja ne postoji, kreiraj novu
      wishlist = new Wishlist({ user: userId, products: [productId] });
      await wishlist.save();
    } else {
      // Ako lista želja postoji, dodaj proizvod ako već nije na listi
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.status(201).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product to wishlist', error: err });
  }
};

// Dohvati listu želja za određenog korisnika
const getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found for this user' });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist', error: err });
  }
};

// Obriši proizvod sa liste želja
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Pronađi listu želja korisnika
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Ukloni proizvod sa liste želja
    const index = wishlist.products.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }
    wishlist.products.splice(index, 1);
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error removing product from wishlist', error: err });
  }
};

// Ažuriraj listu želja (dodaj ili ukloni proizvod)
const updateWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, action } = req.body; // action može biti 'add' ili 'remove'

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    if (action === 'add') {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
        res.status(200).json({ message: 'Product added to wishlist', wishlist });
      } else {
        res.status(400).json({ message: 'Product already in wishlist' });
      }
    } else if (action === 'remove') {
      const index = wishlist.products.indexOf(productId);
      if (index !== -1) {
        wishlist.products.splice(index, 1);
        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
      } else {
        res.status(404).json({ message: 'Product not found in wishlist' });
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating wishlist', error: err });
  }
};

module.exports = {
  addToWishlist,
  getWishlistByUserId,
  removeFromWishlist,
  updateWishlist
};
