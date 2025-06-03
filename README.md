# E-commerce Backend API (Node.js + Express + MongoDB)

This project represents a backend RESTful API for an e-commerce application developed using Node.js, Express.js, and MongoDB. It supports functionalities such as user registration, login, product management, orders, reviews, inventory, and wishlist.

---

## 📆 Technologies Used in the Project

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Swagger Documentation
* Postman (for testing)

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/username/ecommerce-backend.git
cd ecommerce-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```dotenv
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm run dev
```

The server will be available at: `http://localhost:5000`

---

## 🔐 Authentication

The API uses JWT authentication.
Send the token as:

```http
Authorization: Bearer <your_token>
```

---

## 🧪 Key Routes

* `POST /api/users/register` – Register
* `POST /api/users/login` – Login
* `GET /api/products` – List all products
* `POST /api/orders` – Create an order
* `POST /api/reviews` – Add a review
* `GET /api/wishlist/:userId` – Get user's wishlist
* `GET /api/inventory/:productId` – Get product inventory
* `POST /api/transactions` – Create a transaction (admin)

---

## 📄 Swagger Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

Allows testing of all API routes via browser.

---

## 🎯 Project Goal

The goal was to develop a scalable and secure REST API that can serve as a foundation for any modern e-commerce application.

---

## 🙌 Author

**Muhamed Ajanović**
Student at CEPS Kiseljak / Erasmus+ exchange at Universidad de León

---

## 📎 License

MIT License
