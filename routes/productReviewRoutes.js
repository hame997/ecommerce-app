const express = require('express');
const router = express.Router();
const productReviewController = require('../controllers/productReviewController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Kreiraj novu recenziju za proizvod
 *     description: Ova ruta omogućava korisnicima da kreiraju recenziju za proizvod.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Podaci potrebni za kreiranje recenzije
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *             required:
 *               - productId
 *               - rating
 *     responses:
 *       201:
 *         description: Recenzija uspešno kreirana
 *       400:
 *         description: Neispravan zahtev (npr. nedostaju potrebni podaci)
 *       401:
 *         description: Niste autorizovani
 *       500:
 *         description: Došlo je do greške pri kreiranju recenzije
 */
// Kreiraj novu recenziju za proizvod
router.post('/', protect, productReviewController.createReview);

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Dohvati sve recenzije za proizvod
 *     description: Ova ruta omogućava korisnicima da dobiju sve recenzije za određeni proizvod.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID proizvoda za koji se traže recenzije
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista recenzija za proizvod
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   user:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Proizvod nije pronađen
 *       500:
 *         description: Došlo je do greške pri dohvaćanju recenzija
 */
// Dohvati sve recenzije za proizvod
router.get('/:productId', productReviewController.getReviewsByProductId);

// Ažuriraj recenziju
router.put('/:id', productReviewController.updateReview);

// Obriši recenziju
router.delete('/:id', productReviewController.deleteReview);

module.exports = router;
