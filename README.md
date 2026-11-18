# Servicio Web de Autenticacion - Evidencia AA5_EV01

## Informacion del Aprendiz
- **Nombre:** Ana Maria Quimbayo
- **Programa:** ADSO (Analisis y Desarrollo de Software)
- **Ficha:** [Tu numero de ficha]
- **Evidencia:** GA7-220501096-AA5-EV01

## Descripcion
Servicio web REST para registro e inicio de sesion de usuarios, desarrollado con Node.js y Express.

## Tecnologias Utilizadas
- **Node.js**: Entorno de ejecucion JavaScript
- **Express**: Framework web para Node.js
- **bcryptjs**: Libreria para hashear contrasenas
- **CORS**: Middleware para peticiones cross-origin

## Requisitos Previos
- Node.js v16 o superior instalado
- npm (incluido con Node.js)

## Instalacion

1. Clonar el repositorio:
git clone https://github.com/Quimarti/servicio-web-auth.git
cd servicio-web-auth

2. Instalar dependencias:
npm install

3. Iniciar el servidor:
npm start

El servidor se ejecutara en http://localhost:3000

## Endpoints de la API

### 1. Registro de usuario
- **URL:** POST /api/registro
- **Body (JSON):**
{
  "usuario": "juanperez",
  "password": "123456"
}

### 2. Inicio de sesion
- **URL:** POST /api/login
- **Body (JSON):**
{
  "usuario": "juanperez",
  "password": "123456"
}

## Estructura del Proyecto
servicio-web-auth/
├── server.js
├── package.json
├── routes/
│   └── auth.js
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
└── README.md

## Repositorio
https://github.com/Quimarti/servicio-web-auth