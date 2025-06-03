const Inventory = require('../models/Inventory');

// Dodaj novi proizvod u inventar
const addInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Provjera da li već postoji zapis za ovaj proizvod
    const existingInventory = await Inventory.findOne({ product: productId });
    if (existingInventory) {
      return res.status(400).json({ message: 'Inventory for this product already exists' });
    }

    const inventory = new Inventory({
      product: productId,
      quantity,
      lastUpdated: Date.now()
    });

    await inventory.save();
    res.status(201).json({ message: 'Inventory added successfully', inventory });
  } catch (err) {
    res.status(500).json({ message: 'Error adding inventory', error: err.message });
  }
};

// Ažuriraj stanje u inventaru
const updateInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inventory = await Inventory.findById( req.params.id );
    if (!inventory) {
      return res.status(404).json({ message: 'Product not found in inventory' });
    }
    inventory.quantity = quantity || inventory.quantity;
    inventory.lastUpdated = Date.now();
    await inventory.save();
    res.status(200).json({ message: 'Inventory updated successfully', inventory });
  } catch (err) {
    res.status(500).json({ message: 'Error updating inventory', error: err });
  }
};

// Dohvati stanje zaliha za određeni proizvod
const getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ product: req.params.productId }).populate('product', 'name');
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory', error: err });
  }
};



module.exports = {
  addInventory,
  updateInventory,
  getInventoryByProductId
};
