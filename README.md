
# Trabajo número 2 de la materia Desarrollo Web de la carrera Tec. en Análisis de Sistemas.

EN ÉSTA SECCION SE ENCUENTRA LA API DEL SISTEMA A DESARROLLAR.

**Nota: se configuraron ciertas variables de entorno que deberán tambien ser configuradas, en nuestro caso pusimos el PORT como 5500 pero ese puerto dependerá de lo que se tenga configurado tambien habra que configurar como variables de entorno APP_USER, APP_HOST, APP_DB que son las variables que se necesitarán para la comunicación a la BBDD**

# Instalación

El proyecto necesita para funcionar [Node.js](https://nodejs.org/es/) preferentemente la última versión.

#### Instalar dependencias

```sh
$ npm install
```

#### Configuración de variables de entorno

```Ejemplo:``` [Env.ejemplo](./.env.ejemplo)

```Ejemplo env para migración:``` [Env.ejemplo](./migration/.env.ejemplo)

#### Iniciar el proyecto de manera local

```sh
$ npn run runMigration
$ npm start
```
**Nota: para comenzar a utilizar el sistema se debe crear la base de datos compras (de no estar creada la base de datos la migracion no se podra realizar) y configurar las variables de entorno correspondientes. Posteriormente correr el comando npm run runMigration para que se generen todas las tablas de la base de datos y el nuevo super usuario que a modo de ejemplo se lo asignamos a una persona ficticia llamada juan perez.**

#  Librerias utilizadas

Para poder operar el Backend utiliza diferentes librerias que se detallan a continuación

- [Express](https://expressjs.com/) - Framework de Node.js

- [Node.js](https://nodejs.org/es/) - ambiente de desarrollo

- [Nodemon](https://www.npmjs.com/package/nodemon) - servidor en modo escucha

- [jsonWebtoken](https://www.npmjs.com/package/jsonwebtoken) - para formar el token

- [knex.js](https://knexjs.org/) - para la migracion inicial del sistema.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - para hacer hash de las contraseñas

- [multer](https://www.npmjs.com/package/multer) - manejo de archivos

- [node-fetch](https://www.npmjs.com/package/node-fetch) - para hacer fetch y levantar informacion desde una api externa.

- [cors](https://www.npmjs.com/package/cors)

- [MySql](https://www.npmjs.com/package/mysql) - para conexion a base de datos.

  
#  Documentación Postman

https://documenter.getpostman.com/view/14621250/U16kr5Cr

## Rutas usuarios internos
   #### Rutas usuario interno (/userinterno):

   * `POST` | localhost:5500/userinterno -> crea un nuevo usuario interno.

   * `POST` | localhost:5500/userinterno/login -> logeo de usuarios.

   * `POST` | localhost:5500/userinterno/permiso -> asigna permisos a un cierto rol.

   * `POST` | localhost:5500/userinterno/rol -> crea un cierto rol.

   * `GET`  | localhost:5500/userinterno -> genera un listado generalizado de los usuarios internos registrados.

   * `GET`  | localhost:5500/userinterno/:id -> devuelve usuario interno con id que se pasa por parametro.

   * `GET`  | localhost:5500/userinterno/cuil/:cuil -> devuelve usuario interno con cuil que se pasa por parametro.

   * `DELETE`  | localhost:5500/userinterno/:usuario -> Se inhabilita el usuario que se pasa por parametros.

   * `PUT`  | localhost:5500/userinterno/rehabilitar/:usuario -> Se rehabilita el usuario que se pasa por parametros.

 
