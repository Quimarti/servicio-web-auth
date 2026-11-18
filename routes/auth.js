/**
 * ============================================
 * RUTAS DE AUTENTICACION
 * ============================================
 * Define los endpoints del servicio web para
 * registro e inicio de sesion.
 * 
 * Endpoints:
 * - POST /api/registro  -> Registrar nuevo usuario
 * - POST /api/login     -> Iniciar sesion
 * 
 * @author Ana Maria Quimbayo
 * @version 1.0
 * @since 2026-11-18
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @route   POST /api/registro
 * @desc    Registrar un nuevo usuario en el sistema
 * @access  Publico
 */
router.post('/registro', authController.registro);

/**
 * @route   POST /api/login
 * @desc    Iniciar sesion con credenciales existentes
 * @access  Publico
 */
router.post('/login', authController.login);

// Exportar el router para usarlo en el servidor principal
module.exports = router;