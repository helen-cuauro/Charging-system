1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Endpoints](#endpoints)
5. [Autenticación](#autenticación)

# Sistema de Carga

Este es un sistema de carga diseñado para gestionar la autenticación de usuarios y permitir la carga de archivos CSV en una base de datos PostgreSQL.

## Requisitos
Es necesario tener Node.js, npm, y PostgreSQL instalados en tu entorno de desarrollo.

## Instalación
1. Clona este repositorio:
```bash
git clone git@github.com:helen-cuauro/Charging-system.git
cd Charging-system
```
2. Instala las dependencias:
```bash
npm install
```
3. Configura la conexión a la base de datos en el archivo .env, se muestra un ejemplo en el archivo .env.example .
4. Ejecuta un reset de las migraciones con umzug:
```bash
npm run db:reset
```
5. Inicia el servidor:
```bash
npm run dev
```

## Configuración

Para configurar correctamente tu entorno de desarrollo, necesitarás crear un archivo `.env` en la raíz del proyecto y establecer las siguientes variables de entorno.

En el archivo .env.example, proporciona una plantilla para que los usuarios puedan copiarla y configurar las variables según sus necesidades, quedando similiar al siguiente ejemplo:.

```plaintext
# Contenido del archivo .env
# Configuración de la base de datos PostgreSQL
DB_HOST=localhost
DB_NAME=mi_base_de_datos
DB_PORT=5432
DB_USER=mi_usuario
DB_PASSWORD=mi_contraseña
DB_ADMIN_DATABASE=mi_database_admin
# Configuración del token JWT
JWT_SECRET=ultra-secret
COST_FACTOR=10
```

Asegúrate de proporcionar valores específicos para cada variable según los requisitos de tu aplicación.

## Estructura del proyecto

La aplicación sigue una arquitectura de tres capas:
- **Routers:** Define las rutas y maneja las solicitudes HTTP.
- **Servicios:** Contiene la lógica de negocio y se comunica con la capa de acceso a datos.
- **Acceso a Datos:** Gestiona las interacciones con la base de datos PostgreSQL utilizando pg.

## Endpoints

### Loguin de usuarios 
#### post / login
- **Descripción**: Permite a un usuario registrado ingresar a la aplicacion.
- **Body**: `content` - email y password del usuario.
- **Respuesta**: devuelve la información del usuario logeado y el token de authenticacion.

### Carga de Archivos CSV
#### post / upload
- **Descripción**: solo permite en ingreso a usuarios de role admin
- **auth**: `content` - token 
- **STRUCTURED**: `content` - archivo de tipo csv
- **Respuesta**: dato de usuarios success que fueron cargados correctamente a la tabla de datos y datos con errores 

## Autenticación

En este proyecto, utilizamos JSON Web Token (JWT) para gestionar la autenticación. JWT (JSON Web Token) es un estándar abierto (RFC 7519) que define un formato compacto y autónomo para transmitir de forma segura la información entre partes como un objeto JSON. Se utiliza comúnmente para la autenticación y autorización en aplicaciones web y API, permitiendo a los usuarios autenticarse y acceder a recursos de forma segura mediante un token codificado digitalmente.

## Validador de Modelos con Zod

Utilizamos Zod como un validador de modelos para garantizar que los datos cumplan con ciertas reglas y esquemas. Zod es una biblioteca de validación de esquemas en TypeScript que permite definir, validar y manipular esquemas de datos de manera fácil y segura. 



Si deseas contribuir al desarrollo de esta API, simplemente realiza un Pull Request con tus cambios y para que sean revisados.