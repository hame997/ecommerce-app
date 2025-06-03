const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Kreiraj novu narudžbu (korisnik)
 *     description: Ova ruta omogućava korisnicima da kreiraju novu narudžbu.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Podaci potrebni za kreiranje narudžbe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID proizvoda (ObjectId)
 *                     quantity:
 *                       type: integer
 *                       description: Količina proizvoda
 *                   required:
 *                     - product
 *                     - quantity
 *               totalPrice:
 *                 type: number
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *             required:
 *               - orderItems
 *               - totalPrice
 *               - shippingAddress
 *               - paymentMethod
 *     responses:
 *       201:
 *         description: Narudžba uspešno kreirana
 *       400:
 *         description: Neispravan zahtev (nedostaju podaci)
 *       401:
 *         description: Niste autorizovani
 *       500:
 *         description: Došlo je do greške pri kreiranju narudžbe
 */

// Kreiraj novu narudžbu (korisnik)
router.post('/', protect, orderController.addOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Dohvati sve narudžbe (admin)
 *     description: Ova ruta omogućava administratorima da dobiju sve narudžbe.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista svih narudžbi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: string
 *                   totalPrice:
 *                     type: number
 *                   shippingAddress:
 *                     type: string
 *                   paymentMethod:
 *                     type: string
 *                   status:
 *                     type: string
 *                   date:
 *                     type: string
 *       500:
 *         description: Došlo je do greške pri dohvaćanju narudžbi
 */
// Dohvati sve narudžbe (admin)
router.get('/', protect, admin, orderController.getAllOrders);

// Dohvati narudžbe za određenog korisnika
router.get('/user/:userId', protect, orderController.getOrderById);

// Ažuriraj status narudžbe (admin)
router.put('/:id', protect, admin, orderController.updateOrder);

// Obriši narudžbu (admin)
router.delete('/:id', protect, admin, orderController.deleteOrder);

module.exports = router;
