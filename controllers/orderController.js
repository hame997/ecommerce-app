const Order = require('../models/Order');

// Dodavanje nove narudžbe
const addOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Nema stavki u narudžbi." });
    }

    // Kreiranje nove narudžbe
    const newOrder = new Order({
      user: req.user._id, // koristi se middleware 'protect' da doda req.user
      orderItems: orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      totalPrice,
      isPaid: false,
      isDelivered: false
    });

    // Spremanje narudžbe u bazu podataka
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dodavanja narudžbe", error: err.message });
  }
};



// Dohvatanje svih narudžbi
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja narudžbi", error: err.message });
  }
};

// Dohvatanje jedne narudžbe
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Narudžba nije pronađena" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja narudžbe", error: err.message });
  }
};

// Ažuriranje narudžbe (uključujući status)
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Narudžba nije pronađena" });
    }

    // Ažuriraj sve dostupne podatke iz req.body
    Object.assign(order, req.body);

    // Posebna logika za ažuriranje statusa
    if (req.body.isPaid !== undefined) {
      order.paidAt = req.body.isPaid ? new Date() : null;
    }

    if (req.body.isDelivered !== undefined) {
      order.deliveredAt = req.body.isDelivered ? new Date() : null;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);

  } catch (err) {
    res.status(500).json({
      message: "Greška prilikom ažuriranja narudžbe",
      error: err.message
    });
  }
};

// Brisanje narudžbe
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Narudžba nije pronađena" });
    }
    res.status(200).json({ message: "Narudžba uspešno obrisana" });
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom brisanja narudžbe", error: err.message });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
