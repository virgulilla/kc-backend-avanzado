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
- JWT
- RabbitMQ
- Websockets

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

Pon tus datos de configuración en archivo .env para arrancar el entorno.

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

## Documentación de la API

- Con Swagger: http://localhost:3000/api-doc/
- Con Redoc: http://localhost:3000/redoc-static.html

## Configuración rabbitMQ
### Servicio usado para crear thumbnails sobre las imagenes que se suben con la API y via web
Tanto si se usa en cloud, docker o descargado en tu sistema operativo: 
- Crear una instancia
- Desde el listado de instancias, ir al panel de la instancia creada
- En la pestaña Exchanges buscar y clicar thumbnail_jobs (aparecerá cuando desde la API o desde la web se suba una imagen)
- Conectar el exchange con la cola thumbnail_queue y * en Routing key
- Para iniciar el worker que lea las colas de rabbitMQ, ejecutar en terminal: 
```bash
npm run initThumbWorker
```

## Enlace a módulo publicado en NPM

https://www.npmjs.com/package/whatsapp-me?activeTab=readme

### Descripción

Pequeño componente de React que para cargar un botón de whatsapp , que permite varios parametros de configuración
- Live demo: https://www.scoobydog.es/