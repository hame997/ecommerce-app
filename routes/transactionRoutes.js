const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Kreiraj novu transakciju
router.post('/', protect, transactionController.createTransaction);

// Dohvati sve transakcije (admin)
router.get('/', protect, admin, transactionController.getAllTransactions);

// Dohvati transakciju po ID-u
router.get('/:id', protect, transactionController.getTransactionById);

// Ažuriraj transakciju (admin)
router.put('/:id', protect, admin, transactionController.updateTransaction);

// Obriši transakciju (admin)
router.delete('/:id', protect, admin, transactionController.deleteTransaction);

module.exports = router;
