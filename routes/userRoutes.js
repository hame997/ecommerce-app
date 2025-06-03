const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registracija korisnika
 *     description: Omogućava novim korisnicima da se registruju u sistemu.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Ime korisnika
 *               email:
 *                 type: string
 *                 description: Email korisnika
 *               password:
 *                 type: string
 *                 description: Lozinka korisnika
 *     responses:
 *       201:
 *         description: Korisnik je uspešno registrovan
 *       400:
 *         description: Neispravan zahtev (npr. nedostaju potrebni podaci)
 *       500:
 *         description: Došlo je do greške prilikom registracije korisnika
 */

// Registracija korisnika
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login korisnika
 *     description: Omogućava korisnicima da se prijave u sistem koristeći svoje podatke.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email korisnika
 *               password:
 *                 type: string
 *                 description: Lozinka korisnika
 *     responses:
 *       200:
 *         description: Uspešna prijava i generisanje tokena
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token za autentifikaciju
 *       400:
 *         description: Neispravan zahtev (npr. pogrešni podaci za prijavu)
 *       401:
 *         description: Neautorizovan pristup (nevalidni podaci za prijavu)
 *       500:
 *         description: Došlo je do greške prilikom prijave korisnika
 */
// Login korisnika
router.post('/login', userController.loginUser);

// Dohvati sve korisnike (admin)
router.get('/', protect, admin, userController.getAllUsers);

// Dohvati jednog korisnika po ID-u (admin)
router.get('/:id', protect, admin, userController.getUserById);

// Ažuriraj korisnika
router.put('/:id', protect, admin, userController.updateUser);

// Obriši korisnika
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
