/**
 * ============================================
 * SERVIDOR PRINCIPAL - SERVICIO WEB AUTH
 * ============================================
 * Este archivo configura y levanta el servidor
 * Express que expone los endpoints de autenticacion.
 * 
 * Tecnologias utilizadas:
 * - Node.js: Entorno de ejecucion JavaScript
 * - Express: Framework web para Node.js
 * - CORS: Middleware para permitir peticiones cross-origin
 * 
 * Puerto por defecto: 3000
 * 
 * @author Ana Maria Quimbayo
 * @version 1.0
 * @since 2026-11-18
 */

// Importar dependencias necesarias
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Crear instancia de la aplicacion Express
const app = express();

// Definir el puerto donde se ejecutara el servidor
const PORT = process.env.PORT || 3000;

/**
 * Middlewares de la aplicacion
 * Los middlewares se ejecutan antes de llegar a las rutas
 */

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware CORS para permitir peticiones desde otros dominios
app.use(cors());

/**
 * Rutas del servicio web
 * Todas las rutas de autenticacion se montan bajo /api
 */
app.use('/api', authRoutes);

/**
 * Ruta raiz - Informacion del servicio
 * Sirve como punto de entrada y documentacion basica
 */
app.get('/', (req, res) => {
    res.json({
        servicio: "Servicio Web de Autenticacion",
        version: "1.0.0",
        descripcion: "API REST para registro e inicio de sesion",
        endpoints: {
            registro: "POST /api/registro",
            login: "POST /api/login"
        },
        autor: "Ana Maria Quimbayo",
        evidencia: "AA5_EV01 - Diseno y desarrollo de servicios web"
    });
});

/**
 * Manejador de rutas no encontradas (404)
 */
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        mensaje: "El endpoint " + req.method + " " + req.url + " no existe"
    });
});

/**
 * Iniciar el servidor
 * El servidor queda escuchando peticiones en el puerto especificado
 */
app.listen(PORT, () => {
    console.log('============================================');
    console.log('  SERVICIO WEB DE AUTENTICACION');
    console.log('============================================');
    console.log('  Servidor corriendo en puerto: ' + PORT);
    console.log('  URL base: http://localhost:' + PORT);
    console.log('  Endpoint registro: POST http://localhost:' + PORT + '/api/registro');
    console.log('  Endpoint login: POST http://localhost:' + PORT + '/api/login');
    console.log('============================================');
    console.log('  Presiona Ctrl+C para detener el servidor');
    console.log('============================================');
});