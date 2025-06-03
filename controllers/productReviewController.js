const Review = require('../models/Review');

// Kreiraj novu recenziju za proizvod
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = new Review({product: productId, user: req.user.id, rating, comment });
    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', error: err });
  }
  
};

// Dohvati sve recenzije za proizvod
const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err });
  }
};

// Ažuriraj recenziju
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err });
  }
};

// Obriši recenziju
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.remove();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err });
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
  updateReview,
  deleteReview
};
