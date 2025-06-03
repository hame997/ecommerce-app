const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Dodaj novi proizvod (admin)
 *     description: Samo administrator može dodati novi proizvod.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Podaci za proizvod koji se dodaje
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - stock
 *               - image
 *     responses:
 *       201:
 *         description: Proizvod je uspešno dodat
 *       400:
 *         description: Neispravan zahtev
 *       401:
 *         description: Niste autorizovani
 *       500:
 *         description: Došlo je do greške pri dodavanju proizvoda
 */
// Dodaj novi proizvod (admin)
router.post('/',protect, admin, productController.addProduct);  // samo adnim

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Dohvati sve proizvode
 *     description: Ova ruta omogućava svim korisnicima da dobiju sve proizvode.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista proizvoda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   stock:
 *                     type: number
 *                   image:
 *                     type: string
 *       500:
 *         description: Došlo je do greške pri dohvaćanju proizvoda
 */
// Dohvati sve proizvode (svi korisnici)
router.get('/', productController.getAllProducts);

// Dohvati jedan proizvod po ID-u (svi korisnici)
router.get('/:id', productController.getProductById);

// Ažuriraj proizvod (admin)
router.put('/:id', productController.updateProduct);

// Obriši proizvod (admin)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
