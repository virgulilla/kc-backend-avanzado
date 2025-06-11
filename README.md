# Nodepop


Nodepop es una aplicación web **SSR** construida con **Node.js**, **Express.js**, **EJS** y **MongoDB**, que permite a los usuarios logueados visualizar, crear y gestionar sus propios productos de manera sencilla y eficiente.

Este proyecto forma parte del módulo de Desarrollo backend con Node js del bootcamp Desarrollo Web de Keepcoding, donde se aplican conceptos clave como autenticación, rutas protegidas, gestión de datos con MongoDB y renderizado en el servidor utilizando EJS

---

## Descripción del proyecto

Nodepop es un servicio donde los usuarios pueden:
- Autenticarse usando su email y password
- Registrar usuarios
- Buscar productos filtrando por tags, precio y nombre.
- Ver solo sus propios productos.
- Crear y eliminar sus propios anuncios.
  
---

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB / Mongoose
- EJS (SSR)
- Express-session
- bcrypt
- ESLint

---

## 🛠️ Requisitos previos

- Node.js (>= 18.x)
- npm
- MongoDB en local. Descargar de: https://www.mongodb.com/try/download/community

---

## Demo de la aplicación

https://kc-nodepop.onrender.com/

## Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone git@github.com:virgulilla/kc-nodepop.git
cd nodepop
```
### 2. Instalar dependencias

```bash
npm install
```
### 3. Variables de entorno

- Renombra .env.example a .env

Pon tus datos de configuración para arrancar el entorno.

```bash
MONGODB_URI="mongo uri connection_string"
PORT="port_nubmer"
SESSION_SECRET="secret_string"
```

## Inicialización de la base de datos

- Si descargaste e instalaste MongoDB asegurate de que está el servicio corriendo.
    Entra en la consola dentro del proyecto y ejecuta:

```bash
npm run initDB
```

## Arrancar el servidor

```bash
npm start
```

o con nodemon

```bash
npm run dev
```


## Usuarios de prueba
- user1@example.com Contraseña: 1234
- user2@example.com Contraseña: 1234
