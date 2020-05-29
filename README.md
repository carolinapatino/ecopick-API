# MrPostel API 📦

> Verificar que en el editor de código End Of Line sea LF

Repositorio para el desarrollo de una API REST a ser consumida por la aplicación web y la herramienta de back-office Mr.Postel.

## Pre-Requisitos ✔️

- Entorno de ejecución: [Node.js](https://nodejs.org/es/) >= v11.14.0
- Manejador de BD relacional: [PostgreSQL](https://www.postgresql.org/) > v11
- Administrador de paquetes: [NPM](https://www.npmjs.com/) >= 6.7.0
- Sistema de control de versiones: [GIT](https://git-scm.com/) >= 2.20

## Preparación ✔️

1. Crear una base de datos en postgresql
2. Correr el script "scripts.sql" que se encuentra en config/DB/
3. Agregar un archivo .env en el root del proyecto

> Deberá contactar a los desarrolladores para obtener las llaves necesarias para tener acceso completo a todas las funcionalidades.

## Ejecutar el proyecto 💻

### Primeros pasos

Para poder obtener localmente el proyecto y así dar inicio al desarrollo y/o poder realizar pruebas, deberá abrir la consola de comandos y ejecutar lo siguiente:

```bash
git clone https://github.com/albasanchez/mrPostel-API.git
cd mrPostel-API
npm install
```

### Iniciar el servidor

```bash
npm run dev
```

## Dependencias del proyecto 📜

### Dependencias

- @sendgrid/mail: ^7.1.1
- axios: ^0.19.2
- body-parser: ^1.19.0
- compression: ^1.7.4
- cors: ^2.8.5
- dotenv: ^8.2.0
- express: ^4.17.1
- helmet: ^3.22.0
- http-errors: ^1.7.3
- humps: ^2.0.1
- jwt-simple: ^0.5.6
- lob: ^6.1.0
- moment: ^2.26.0
- multer: ^1.4.2
- node-telegram-bot-api: ^0.50.0
- pg-promise: ^10.5.6
- winston: ^3.2.1

### Dependencias de desarrollo

- @babel/cli: ^7.10.1
- babel-preset-env: ^1.7.0
- eslint: ^7.1.0
- eslint-config-prettier: ^6.11.0
- eslint-plugin-import: ^2.20.2
- eslint-plugin-prettier: ^3.1.3
- jest: ^26.0.1
- nodemon: ^2.0.4
- prettier: ^2.0.5
- superagent: ^5.2.2
- supertest: ^4.0.2

## Developers 👩👩👩

- [Nadal, Vanessa](https://github.com/vanessanadal)
- [Patiño, Carolina](https://github.com/carolinapatino)
- [Sánchez, Alba](https://github.com/albasanchez)
