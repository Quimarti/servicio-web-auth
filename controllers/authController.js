/**
 * ============================================
 * CONTROLADOR DE AUTENTICACION
 * ============================================
 * Este modulo contiene la logica de negocio para
 * el registro y login de usuarios.
 * 
 * Utiliza bcryptjs para hashear contrasenas de forma segura.
 * 
 * @author Ana Maria Quimbayo
 * @version 1.1
 * @since 2026-11-18
 */

const bcrypt = require('bcryptjs');

// IMPORTANTE: Se usa desestructuracion para extraer la clase User
// y las funciones del modulo. Si se hace "const User = require(...)"
// se obtiene el objeto contenedor, no la clase, y "new User()" falla.
const { User, findByUsername, createUser } = require('../models/User');

/**
 * Controlador de Registro
 * Recibe usuario y contrasena, valida que no exista,
 * hashea la contrasena y guarda el usuario.
 */
exports.registro = (req, res) => {
    try {
        // 1. Extraer datos del cuerpo de la peticion
        const { usuario, password } = req.body;
        
        // 2. Validar que se enviaron todos los campos requeridos
        if (!usuario || !password) {
            return res.status(400).json({
                error: "Error en la autenticacion",
                mensaje: "Los campos usuario y password son obligatorios"
            });
        }
        
        // 3. Validar longitud minima
        if (usuario.length < 3 || password.length < 4) {
            return res.status(400).json({
                error: "Error en la autenticacion",
                mensaje: "El usuario debe tener al menos 3 caracteres y la contrasena al menos 4"
            });
        }
        
        // 4. Verificar que el usuario no exista ya registrado
        const usuarioExistente = findByUsername(usuario);
        if (usuarioExistente) {
            return res.status(409).json({
                error: "Error en la autenticacion",
                mensaje: "El usuario ya esta registrado"
            });
        }
        
        // 5. Hashear la contrasena con bcrypt (10 rondas de sal)
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        
        // 6. Crear el objeto usuario usando la clase User
        const nuevoUsuario = new User(usuario, passwordHash);
        
        // 7. Guardar en el "almacen" de datos
        createUser(nuevoUsuario);
        
        // 8. Retornar respuesta exitosa
        return res.status(201).json({
            mensaje: "Autenticacion satisfactoria",
            detalle: "Usuario registrado exitosamente",
            usuario: {
                id: nuevoUsuario.id,
                usuario: nuevoUsuario.usuario,
                fechaCreacion: nuevoUsuario.fechaCreacion
            }
        });
        
    } catch (error) {
        console.error("Error en registro:", error);
        return res.status(500).json({
            error: "Error en la autenticacion",
            mensaje: "Error interno del servidor"
        });
    }
};

/**
 * Controlador de Login
 * Recibe usuario y contrasena, verifica credenciales
 * y retorna mensaje de exito o error.
 */
exports.login = (req, res) => {
    try {
        // 1. Extraer credenciales del cuerpo de la peticion
        const { usuario, password } = req.body;
        
        // 2. Validar que se enviaron todos los campos
        if (!usuario || !password) {
            return res.status(400).json({
                error: "Error en la autenticacion",
                mensaje: "Los campos usuario y password son obligatorios"
            });
        }
        
        // 3. Buscar el usuario en el almacen de datos
        const usuarioEncontrado = findByUsername(usuario);
        
        // 4. Si no existe el usuario, retornar error
        if (!usuarioEncontrado) {
            return res.status(401).json({
                error: "Error en la autenticacion",
                mensaje: "Usuario o contrasena incorrectos"
            });
        }
        
        // 5. Comparar la contrasena enviada con la hasheada
        const passwordValida = bcrypt.compareSync(password, usuarioEncontrado.password);
        
        // 6. Si la contrasena no coincide, retornar error
        if (!passwordValida) {
            return res.status(401).json({
                error: "Error en la autenticacion",
                mensaje: "Usuario o contrasena incorrectos"
            });
        }
        
        // 7. Autenticacion exitosa
        return res.status(200).json({
            mensaje: "Autenticacion satisfactoria",
            usuario: {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.usuario,
                fechaCreacion: usuarioEncontrado.fechaCreacion
            }
        });
        
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({
            error: "Error en la autenticacion",
            mensaje: "Error interno del servidor"
        });
    }
};