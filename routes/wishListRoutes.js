const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');
router.use(protect); // štiti sve rute ispod

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Dodaj proizvod na listu želja
 *     description: Dodaj proizvod na listu želja za korisnika.
 *     tags:
 *       - Wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proizvod je uspešno dodat na listu želja
 *       404:
 *         description: Proizvod ili korisnik nije pronađen
 *       500:
 *         description: Došlo je do greške prilikom dodavanja proizvoda na listu želja
 */
// Dodaj proizvod na listu želja
router.post('/', wishlistController.addToWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Dohvati listu želja za određenog korisnika
 *     description: Vraća listu proizvoda koji se nalaze na listi želja korisnika sa zadatim ID-em.
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID korisnika za kojeg se traži lista želja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista želja korisnika
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lista želja za ovog korisnika nije pronađena
 *       500:
 *         description: Došlo je do greške prilikom dohvaćanja liste želja
 */
// Dohvati listu želja za određenog korisnika
router.get('/:userId', wishlistController.getWishlistByUserId);

/**
 * @swagger
 * /api/wishlist/{userId}/{productId}:
 *   delete:
 *     summary: Obriši proizvod sa liste želja
 *     description: Uklanja proizvod sa liste želja korisnika sa zadatim ID-em.
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID korisnika čiju listu želja želimo da izmenimo
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID proizvoda koji treba da bude uklonjen sa liste želja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proizvod je uspešno uklonjen sa liste želja
 *       404:
 *         description: Lista želja ili proizvod nije pronađen
 *       500:
 *         description: Došlo je do greške prilikom uklanjanja proizvoda sa liste želja
 */
// Obriši proizvod sa liste želja
router.delete('/:userId/:productId', wishlistController.removeFromWishlist);

// Ažuriraj listu želja (dodaj ili ukloni proizvod)
router.put('/:userId', wishlistController.updateWishlist);

module.exports = router;
