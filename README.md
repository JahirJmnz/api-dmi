# API de Biblioteca DMI - Equipo SHD

API REST desarrollada con Next.js y TypeScript para la gestión de una biblioteca con operaciones CRUD completas para usuarios, libros y préstamos.

## Tecnologías

- **Next.js 15+** con App Router
- **TypeScript** para tipado estático
- **ESLint** para calidad de código
- **Git** con flujo de trabajo estructurado

## Estructura del Proyecto

```
api-dmi/
├── app/
│   ├── api/
│   │   ├── ping/route.ts         # GET /api/ping
│   │   ├── users/route.ts        # GET, POST /api/users
│   │   ├── users/[id]/route.ts   # GET, PUT, DELETE /api/users/:id
│   │   ├── books/route.ts        # GET, POST /api/books
│   │   ├── books/[id]/route.ts   # GET, PUT, DELETE /api/books/:id
│   │   ├── loans/route.ts        # GET, POST /api/loans
│   │   ├── loans/[id]/route.ts   # GET, DELETE /api/loans/:id
│   │   ├── loans/[id]/return/route.ts  # PATCH /api/loans/:id/return
│   │   ├── categories/route.ts   # GET, POST /api/categories
│   │   └── categories/[id]/route.ts  # GET, PUT, DELETE /api/categories/:id
│   ├── lib/
│   │   └── db.ts                 # Módulo de almacenamiento en memoria
│   └── globals.css
├── .github/
│   └── pull_request_template.md  # Plantilla para PRs
├── test-api.js                   # Script de tests automatizados
├── CONTEXTO-GENERAL-DEL-PROYECTO/
├── BICATORA-INTEGRANTE/
└── README.md
```

## Modelo de Datos

```typescript
interface User {
  id: string;
  nombre: string;
  email: string;
}

interface Book {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  disponible: boolean;
}

interface Loan {
  id: string;
  usuarioId: string;
  libroId: string;
  fechaPrestamo: string;
  fechaDevolucion: string | null;
}

interface Category {
  id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
}
```

## Endpoints de la API

### 1. API Usuarios (CRUD Completo)

#### 1.1 Listar Usuarios
- **GET** `/api/users`
- **Respuesta**: Array de usuarios
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/users
```

#### 1.2 Crear Usuario
- **POST** `/api/users`
- **Body**: `{ nombre: string, email: string }`
- **Respuesta**: Usuario creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (email duplicado)

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@email.com"}'
```

#### 1.3 Obtener Usuario por ID
- **GET** `/api/users/:id`
- **Respuesta**: Usuario específico
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X GET http://localhost:3000/api/users/USER_ID
```

#### 1.4 Actualizar Usuario
- **PUT** `/api/users/:id`
- **Body**: `{ nombre?: string, email?: string }`
- **Respuesta**: Usuario actualizado
- **Códigos**: 200 (éxito), 400 (datos inválidos), 404 (no encontrado), 409 (email duplicado)

```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Carlos Pérez"}'
```

#### 1.5 Eliminar Usuario
- **DELETE** `/api/users/:id`
- **Respuesta**: Sin contenido
- **Códigos**: 204 (eliminado), 404 (no encontrado)

```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

### 2. API Libros (CRUD Completo)

#### 2.1 Listar Libros
- **GET** `/api/books`
- **Respuesta**: Array de libros
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/books
```

#### 2.2 Crear Libro
- **POST** `/api/books`
- **Body**: `{ titulo: string, autor: string, isbn: string }`
- **Respuesta**: Libro creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (ISBN duplicado)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"titulo":"1984","autor":"George Orwell","isbn":"978-0-452-28423-4"}'
```

#### 2.3 Obtener Libro por ID
- **GET** `/api/books/:id`
- **Respuesta**: Libro específico
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X GET http://localhost:3000/api/books/BOOK_ID
```

#### 2.4 Actualizar Libro
- **PUT** `/api/books/:id`
- **Body**: `{ titulo?: string, autor?: string, isbn?: string, disponible?: boolean }`
- **Respuesta**: Libro actualizado
- **Códigos**: 200 (éxito), 400 (datos inválidos), 404 (no encontrado), 409 (ISBN duplicado)

```bash
curl -X PUT http://localhost:3000/api/books/BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{"disponible":false}'
```

#### 2.5 Eliminar Libro
- **DELETE** `/api/books/:id`
- **Respuesta**: Sin contenido
- **Códigos**: 204 (eliminado), 404 (no encontrado)

```bash
curl -X DELETE http://localhost:3000/api/books/BOOK_ID
```

### 3. API Préstamos (CRUD Completo)

#### 3.1 Listar Préstamos
- **GET** `/api/loans`
- **Respuesta**: Array de préstamos
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/loans
```

#### 3.2 Registrar Préstamo
- **POST** `/api/loans`
- **Body**: `{ usuarioId: string, libroId: string }`
- **Respuesta**: Préstamo creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 404 (usuario/libro no encontrado), 409 (libro no disponible)

```bash
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -d '{"usuarioId":"550e8400-e29b-41d4-a716-446655440001","libroId":"550e8400-e29b-41d4-a716-446655440003"}'
```

#### 3.3 Obtener Préstamo por ID
- **GET** `/api/loans/:id`
- **Respuesta**: Préstamo específico
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X GET http://localhost:3000/api/loans/LOAN_ID
```

#### 3.4 Devolver Libro
- **PATCH** `/api/loans/:id/return`
- **Respuesta**: Préstamo actualizado
- **Códigos**: 200 (éxito), 404 (préstamo no encontrado)

```bash
curl -X PATCH http://localhost:3000/api/loans/LOAN_ID/return
```

#### 3.5 Cancelar Préstamo
- **DELETE** `/api/loans/:id`
- **Respuesta**: Sin contenido
- **Códigos**: 204 (eliminado), 404 (no encontrado)

```bash
curl -X DELETE http://localhost:3000/api/loans/LOAN_ID
```

### 4. API Categorías (CRUD Completo)

#### 4.1 Listar Categorías
- **GET** `/api/categories`
- **Respuesta**: Array de categorías
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/categories
```

#### 4.2 Crear Categoría
- **POST** `/api/categories`
- **Body**: `{ nombre: string, descripcion: string, activa: boolean }`
- **Respuesta**: Categoría creada
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (nombre duplicado)

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ciencia Ficción","descripcion":"Libros de ciencia ficción","activa":true}'
```

#### 4.3 Obtener Categoría por ID
- **GET** `/api/categories/:id`
- **Respuesta**: Categoría específica
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X GET http://localhost:3000/api/categories/CATEGORY_ID
```

#### 4.4 Actualizar Categoría
- **PUT** `/api/categories/:id`
- **Body**: `{ nombre?: string, descripcion?: string, activa?: boolean }`
- **Respuesta**: Categoría actualizada
- **Códigos**: 200 (éxito), 400 (datos inválidos), 404 (no encontrado), 409 (nombre duplicado)

```bash
curl -X PUT http://localhost:3000/api/categories/CATEGORY_ID \
  -H "Content-Type: application/json" \
  -d '{"activa":false}'
```

#### 4.5 Eliminar Categoría
- **DELETE** `/api/categories/:id`
- **Respuesta**: Sin contenido
- **Códigos**: 204 (eliminado), 404 (no encontrado)

```bash
curl -X DELETE http://localhost:3000/api/categories/CATEGORY_ID
```

## Resumen de APIs

### 🎯 **4 APIs CRUD Completas**

| API | Asignado a | Estado | Endpoints | Funcionalidad |
|-----|------------|--------|-----------|---------------|
| **Usuarios** | @JahirJmnz | ✅ **COMPLETADO** | GET, POST, GET/:id, PUT/:id, DELETE/:id | Gestión completa de usuarios |
| **Libros** | @Imamtz0104 | ⏳ En desarrollo | GET, POST, GET/:id, PUT/:id, DELETE/:id | Gestión completa de libros |
| **Préstamos** | @Jairhc2 | ⏳ En desarrollo | GET, POST, GET/:id, PATCH/:id/return, DELETE/:id | Gestión completa de préstamos |
| **Categorías** | @Antonioh1ni | ⏳ En desarrollo | GET, POST, GET/:id, PUT/:id, DELETE/:id | Gestión completa de categorías |

### 📊 **Progreso del Proyecto**
- ✅ **API Usuarios**: Completada - [PR #35](https://github.com/JahirJmnz/api-dmi/pull/35) hacia qa
- ⏳ **API Libros**: Pendiente - Imanol
- ⏳ **API Préstamos**: Pendiente - Jair  
- ⏳ **API Categorías**: Pendiente - Antonio

### 🧪 **Tests Automatizados**
- Script `test-api.js` para validación automática
- Comando `npm test` para ejecutar tests
- Validación completa de funcionalidad CRUD

## Desarrollo

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La API estará disponible en [http://localhost:3000/api](http://localhost:3000/api)

### Ejecutar tests

```bash
# Tests automatizados
npm test

# Tests en modo watch (requiere nodemon)
npm run test:watch
```

### Flujo de trabajo

1. **Ramas**: `main` (estable), `qa` (integración), `release` (candidatos)
2. **Desarrollo**: Cada integrante trabaja en `feature/<nombre>/ISS-XX-descripcion`
3. **PRs**: Todos van primero a `qa` con review obligatorio
4. **Release**: Solo 1-2 features seleccionadas van a `release`
5. **Commits**: Formato `feat(users): descripción #XX`

### Validaciones

- **Email**: Formato válido y único
- **Nombre**: String no vacío, mínimo 2 caracteres
- **ISBN**: Formato válido y único
- **UUID**: Formato válido para IDs

### Códigos de Error

- **400**: Bad Request (datos inválidos)
- **404**: Not Found (recurso no encontrado)
- **409**: Conflict (email duplicado)
- **500**: Internal Server Error (errores del servidor)

## Equipo SHD

- **Jahir Jiménez**: Líder del equipo
- **Jair Hernández**: Desarrollador Backend
- **Imanol Hernández**: Desarrollador Backend
- **Antonio Hernández**: Desarrollador Backend

## Documentación Adicional

- [Contexto del Proyecto](./CONTEXTO-GENERAL-DEL-PROYECTO/Contexto.md)
- [Guía de Trabajo](./CONTEXTO-GENERAL-DEL-PROYECTO/Guia-de-trabajo-y-contexto.md)
- [Bitácoras del Equipo](./BICATORA-INTEGRANTE/)
