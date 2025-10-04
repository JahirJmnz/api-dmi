# API de Gestión de Usuarios - Equipo SHD

API REST desarrollada con Next.js y TypeScript para la gestión de usuarios con operaciones CRUD completas.

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
│   │   └── users/
│   │       ├── route.ts          # GET, POST /api/users
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE /api/users/:id
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
  name: string;
  email: string;
  age: number;
}
```

## Endpoints de la API

### 1. Listar Usuarios
- **GET** `/api/users`
- **Respuesta**: Array de usuarios
- **Códigos**: 200 (éxito)

```bash
curl -X GET http://localhost:3000/api/users
```

### 2. Obtener Usuario
- **GET** `/api/users/:id`
- **Respuesta**: Usuario específico
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X GET http://localhost:3000/api/users/123
```

### 3. Crear Usuario
- **POST** `/api/users`
- **Body**: `{ name: string, email: string, age: number }`
- **Respuesta**: Usuario creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (email duplicado)

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@email.com","age":25}'
```

### 4. Actualizar Usuario
- **PUT** `/api/users/:id`
- **Body**: `{ name?: string, email?: string, age?: number }`
- **Respuesta**: Usuario actualizado
- **Códigos**: 200 (éxito), 400 (datos inválidos), 404 (no encontrado), 409 (email duplicado)

```bash
curl -X PUT http://localhost:3000/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Carlos Pérez","age":26}'
```

### 5. Eliminar Usuario
- **DELETE** `/api/users/:id`
- **Respuesta**: Mensaje de confirmación
- **Códigos**: 200 (éxito), 404 (no encontrado)

```bash
curl -X DELETE http://localhost:3000/api/users/123
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
- **Edad**: Número positivo entre 1 y 120
- **Nombre**: String no vacío, mínimo 2 caracteres

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
