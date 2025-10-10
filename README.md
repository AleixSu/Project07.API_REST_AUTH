# NightWorld API

API REST construida con **Node.js**, **Express** y **MongoDB (Mongoose)** para la gestión de razas, líderes (reyes alfa) y convertidos dentro de un mundo oscuro de criaturas como vampiros, hombres lobo y necrófagos.

Permite crear, leer, actualizar y eliminar entidades, con un sistema de **roles y autenticación mediante JWT**, donde los líderes pueden crear y administrar convertidos dentro de su misma especie.

---

## Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```env
   DB_URL=mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/nightworldDB
   JWT_SECRET=supersecretkey
   PORT=3000
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   Por defecto la API corre en:  
   `http://localhost:3000/api/v1`

---

## Endpoints disponibles

### Species

Base: `/api/v1/species`

| Método | Endpoint | Descripción                      |
| ------ | -------- | -------------------------------- |
| GET    | `/`      | Obtiene todas las especies.      |
| POST   | `/`      | Crea una nueva especie.          |
| PATCH  | `/:id`   | Actualiza una especie existente. |
| DELETE | `/:id`   | Elimina una especie.             |

#### Ejemplo de body para POST

```json
{
  "name": "Vampires",
  "territory": "Eastern Europe",
  "hierarchyLevel": 3
}
```

---

### Kings

Base: `/api/v1/kings`

| Método | Endpoint | Descripción                 |
| ------ | -------- | --------------------------- |
| GET    | `/`      | Obtiene todos los reyes.    |
| POST   | `/`      | Crea un nuevo rey.          |
| PATCH  | `/:id`   | Actualiza un rey existente. |
| DELETE | `/:id`   | Elimina un rey.             |

#### Ejemplo de body para POST

```json
{
  "name": "Fenrir Odinson",
  "age": 950,
  "specie": "ObjectId('66d7ee0786b5936851d7cf22')"
}
```

---

### Converts

Base: `/api/v1/converted`

| Método | Endpoint            | Descripción                                                                     |
| ------ | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/`                 | Obtiene todos los convertidos (populate con especie y rey).                     |
| GET    | `/kingArmy/:king`   | Obtiene todos los convertidos pertenecientes a un rey.                          |
| GET    | `/:id`              | Obtiene un convertido por su ID.                                                |
| POST   | `/register`         | Crea un nuevo convertido (solo usuarios autenticados).                          |
| POST   | `/register/byAdmin` | Crea un nuevo convertido (solo administradores).                                |
| POST   | `/login`            | Inicia sesión y devuelve el token JWT.                                          |
| PATCH  | `/:id`              | Actualiza datos de un convertido (el propio usuario o un admin pueden hacerlo). |
| DELETE | `/:id`              | Elimina un usuario (el propio convertido o un admin pueden hacerlo).            |

#### Ejemplo de body para registro

```json
{
  "userName": "lilith",
  "password": "darkmoon"
}
```

---

## Roles y Autenticación

- **convertedUser**: puede crear nuevos usuarios de su misma especie.
- **alphaAdmin**: puede crear, modificar o eliminar cualquier usuario.
- **worldCreator**: rol reservado para el creador del mundo (configuración inicial).

Los tokens JWT se generan al iniciar sesión y deben incluirse en el header:

```
Authorization: Bearer <token>
```

---

## Tecnologías usadas

- Node.js + Express
- MongoDB + Mongoose
- bcrypt
- dotenv
- jsonwebtoken
- nodemon (dev)

---

## Relaciones entre colecciones

```mermaid
erDiagram
    Species {
        ObjectId _id
        string name
        string territory
        number hierarchyLevel
    }

    Kings {
        ObjectId _id
        string name
        number age
        ObjectId specie
    }

    Converts {
        ObjectId _id
        string userName
        string password
        string role
        ObjectId king
        ObjectId specie
    }

    Species ||--o{ Kings: "has many"
    Kings ||--o{ Converts : "commands"
    Species ||--o{ Converts : "belongs to"
```

---

## Testing con Postman/Insomnia

1. Inicia el servidor con `npm run dev`.
2. Registra un `worldCreator` directamente en la base de datos.
3. Usa su token para crear especies, reyes y primeros convertidos.
4. Valida permisos entre roles con distintos tokens.
