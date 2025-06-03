const Transaction = require('../models/Transaction');

// Kreiraj novu transakciju
const createTransaction = async (req, res) => {
  try {
    const { user, order, paymentMethod, paymentStatus, transactionAmount, transactionId } = req.body;
    const transaction = new Transaction({user, order, paymentMethod, paymentStatus, transactionAmount, transactionId });
    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction', error: err });
  }
};

// Ažuriraj transakciju
const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction', error: err });
  }
};

// Obriši transakciju
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction', error: err });
  }
};

// Dohvati sve transakcije
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
};

// Dohvati transakciju po ID-u
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transaction', error: err });
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById
};
