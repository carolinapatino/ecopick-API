# mrPostel-API

> README EN ELABORACIÓN
> Si existe un error en el editor de código: verificar que el End Of Line sea LF

### Preparación

1. Crear una base de datos en postgresql
2. Correr los scripts que se encuentran en config/DB/ en el siguiente orden: create, alter, insert
3. Crear un archivo .env en el root del proyecto con los siguientes campos:

- NODE_ENV=development
- PORT=3000
- DB_PORT=5432
- DB_HOST=localhost
- SECRET_TOKEN con cualquier codigo que se desee colocar
- DB_USER, DB_PASSWORD, DB_NAME con los datos de la BD creada en postgresql

### Correr el proyecto

- npm install
- npm run dev

### Dependencias del proyecto

- Express
- dotenv
- pg-promise
- moment
- jwt-simple
- body-parser
- compression
- cors
- winston
- humps

### Dependencias de desarrollo

- nodemon
- babel-preset-env
- @babel/cli
- jest
- supertest
- superagent
- eslint
- prettier
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier

### Dependencias en consideración

- node-cron
