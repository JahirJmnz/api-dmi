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
│   │   ├── health/route.ts       # GET /api/health
│   │   ├── users/route.ts        # GET, POST /api/users
│   │   ├── books/route.ts        # GET, POST /api/books
│   │   └── loans/route.ts        # GET, POST /api/loans
│   │       └── [id]/return/route.ts  # PATCH /api/loans/:id/return
│   ├── lib/
│   │   └── db.ts                 # Módulo de almacenamiento en memoria
│   └── globals.css
├── .github/
│   └── pull_request_template.md  # Plantilla para PRs
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
```

## Endpoints de la API

### 1. Health Check
- **GET** `/api/ping`
- **Respuesta**: `{ ok: true, timestamp: number, message: string }`
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/ping
```

### 2. Health Check Avanzado
- **GET** `/api/health`
- **Respuesta**: `{ status: string, version: string, timestamp: string, database: string }`
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/health
```

### 3. Listar Usuarios
- **GET** `/api/users`
- **Respuesta**: Array de usuarios
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/users
```

### 4. Crear Usuario
- **POST** `/api/users`
- **Body**: `{ nombre: string, email: string }`
- **Respuesta**: Usuario creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (email duplicado)

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@email.com"}'
```

### 5. Listar Libros
- **GET** `/api/books`
- **Respuesta**: Array de libros
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/books
```

### 6. Crear Libro
- **POST** `/api/books`
- **Body**: `{ titulo: string, autor: string, isbn: string }`
- **Respuesta**: Libro creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (ISBN duplicado)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"titulo":"1984","autor":"George Orwell","isbn":"978-0-452-28423-4"}'
```

### 7. Registrar Préstamo
- **POST** `/api/loans`
- **Body**: `{ usuarioId: string, libroId: string }`
- **Respuesta**: Préstamo creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 404 (usuario/libro no encontrado), 409 (libro no disponible)

```bash
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -d '{"usuarioId":"550e8400-e29b-41d4-a716-446655440001","libroId":"550e8400-e29b-41d4-a716-446655440003"}'
```

### 8. Listar Préstamos
- **GET** `/api/loans`
- **Respuesta**: Array de préstamos
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/loans
```

### 9. Devolver Libro
- **PATCH** `/api/loans/:id/return`
- **Respuesta**: Préstamo actualizado
- **Códigos**: 200 (éxito), 404 (préstamo no encontrado)

```bash
curl -X PATCH http://localhost:3000/api/loans/LOAN_ID/return
```

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
