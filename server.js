const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const setupSwagger = require('./swagger');


const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;

// MongoDB konekcija
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Korišćenje JWT_SECRET u aplikaciji, ako je potrebno
const jwtSecret = process.env.JWT_SECRET;

app.get('/', (req, res) => {
  res.send('Dobrodošao u e-trgovinsku aplikaciju!');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const productReviewRoutes = require('./routes/productReviewRoutes');
app.use('/api/reviews', productReviewRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);

const wishlistRoutes = require('./routes/wishListRoutes');
app.use('/api/wishlist', wishlistRoutes); 

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);

});
