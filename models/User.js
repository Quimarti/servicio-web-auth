/**
 * ============================================
 * MODELO DE USUARIO
 * ============================================
 * Este modulo define la estructura de datos del usuario
 * y proporciona metodos para gestionar usuarios en memoria.
 * 
 * En un proyecto real, estos datos se guardarian en una
 * base de datos como MySQL, PostgreSQL o MongoDB.
 * 
 * @author Ana Maria Quimbayo
 * @version 1.0
 * @since 2026-11-18
 */

// Array en memoria para almacenar usuarios registrados
const usuarios = [];

/**
 * Clase User
 * Representa la entidad de usuario del sistema
 */
class User {
    
    /**
     * Constructor de la clase User
     * @param {string} usuario - Nombre de usuario
     * @param {string} password - Contrasena (se guardara hasheada)
     */
    constructor(usuario, password) {
        this.id = Date.now();
        this.usuario = usuario;
        this.password = password;
        this.fechaCreacion = new Date().toISOString();
    }
}

/**
 * Busca un usuario por nombre de usuario
 * @param {string} usuario - Nombre de usuario a buscar
 * @returns {Object|undefined} El usuario encontrado o undefined
 */
function findByUsername(usuario) {
    return usuarios.find(u => u.usuario === usuario);
}

/**
 * Agrega un nuevo usuario al arreglo
 * @param {Object} user - Objeto usuario a agregar
 * @returns {Object} El usuario creado
 */
function createUser(user) {
    usuarios.push(user);
    return user;
}

/**
 * Obtiene todos los usuarios registrados
 * @returns {Array} Lista de usuarios (sin contrasenas)
 */
function getAllUsers() {
    return usuarios.map(u => ({
        id: u.id,
        usuario: u.usuario,
        fechaCreacion: u.fechaCreacion
    }));
}

// Exportar funciones y clase para usar en otros modulos
module.exports = {
    User,
    findByUsername,
    createUser,
    getAllUsers
};
