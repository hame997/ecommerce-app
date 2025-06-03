const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Dodaj stanje u inventar (admin)
 *     description: Ova ruta omogućava administratoru da doda novo stanje u inventar za proizvod.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Podaci potrebni za dodavanje stanja u inventar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               restockDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - productId
 *               - quantity
 *               - restockDate
 *     responses:
 *       201:
 *         description: Stanje uspešno dodano u inventar
 *       400:
 *         description: Neispravan zahtev (nedostaju podaci)
 *       401:
 *         description: Niste autorizovani
 *       403:
 *         description: Samo admin može dodati stanje u inventar
 *       500:
 *         description: Došlo je do greške pri dodavanju stanja u inventar
 */
// Dodaj stanje u inventar
router.post('/', protect, admin, inventoryController.addInventory);

// Ažuriraj stanje u inventaru
router.put('/:id', protect, admin, inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventory/{productId}:
 *   get:
 *     summary: Dohvati stanje inventara za proizvod
 *     description: Ova ruta omogućava korisnicima da dobiju stanje inventara za određeni proizvod.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID proizvoda za koji se traži stanje u inventaru
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stanje inventara za proizvod
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 restockDate:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Proizvod nije pronađen u inventaru
 *       500:
 *         description: Došlo je do greške pri dohvaćanju stanja inventara
 */

// Dohvati stanje inventara za proizvod
router.get('/:productId', inventoryController.getInventoryByProductId);

module.exports = router;
