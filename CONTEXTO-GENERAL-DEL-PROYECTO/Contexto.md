# Contexto del Proyecto - API de Gestión de Usuarios

## Descripción General
Desarrollar una API REST completa para la gestión de usuarios utilizando Next.js con TypeScript. El proyecto debe implementar operaciones CRUD básicas con validaciones, manejo de errores y documentación adecuada.

## Tecnologías Utilizadas
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
├── package.json
├── tsconfig.json
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

### 2. Obtener Usuario
- **GET** `/api/users/:id`
- **Respuesta**: Usuario específico
- **Códigos**: 200 (éxito), 404 (no encontrado)

### 3. Crear Usuario
- **POST** `/api/users`
- **Body**: `{ name: string, email: string, age: number }`
- **Respuesta**: Usuario creado
- **Códigos**: 201 (creado), 400 (datos inválidos), 409 (email duplicado)

### 4. Actualizar Usuario
- **PUT** `/api/users/:id`
- **Body**: `{ name?: string, email?: string, age?: number }`
- **Respuesta**: Usuario actualizado
- **Códigos**: 200 (éxito), 400 (datos inválidos), 404 (no encontrado), 409 (email duplicado)

### 5. Eliminar Usuario
- **DELETE** `/api/users/:id`
- **Respuesta**: Mensaje de confirmación
- **Códigos**: 200 (éxito), 404 (no encontrado)

## Validaciones Requeridas
- **Email**: Formato válido y único
- **Edad**: Número positivo entre 1 y 120
- **Nombre**: String no vacío, mínimo 2 caracteres
- **ID**: UUID válido para operaciones de actualización/eliminación

## Códigos de Error
- **400**: Bad Request (datos inválidos)
- **404**: Not Found (recurso no encontrado)
- **409**: Conflict (email duplicado)
- **500**: Internal Server Error (errores del servidor)

## Almacenamiento
- **Tipo**: En memoria (no persistente)
- **Estructura**: Array de objetos User
- **Operaciones**: CRUD básicas con validaciones

## Flujo de Desarrollo
1. **Configuración inicial** del proyecto Next.js
2. **Creación del módulo db.ts** para almacenamiento
3. **Implementación de endpoints** por desarrollador
4. **Validaciones y manejo de errores**
5. **Documentación y pruebas**
6. **Review y merge** a rama qa
7. **Selección de features** para release
8. **Promoción final** a main

## Criterios de Aceptación
- [ ] Todos los endpoints funcionan correctamente
- [ ] Validaciones implementadas según especificación
- [ ] Códigos de error apropiados
- [ ] Documentación completa con ejemplos curl
- [ ] Commits con convención establecida
- [ ] PRs con plantilla completa
- [ ] Reviews apropiados del líder
- [ ] Flujo Git respetado (main → qa → release)

## Comandos de Prueba
```bash
# Listar usuarios
curl -X GET http://localhost:3000/api/users

# Obtener usuario
curl -X GET http://localhost:3000/api/users/123

# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@email.com","age":25}'

# Actualizar usuario
curl -X PUT http://localhost:3000/api/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Carlos Pérez","age":26}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/123
```

## Notas de Implementación
- Usar `crypto.randomUUID()` para generar IDs únicos
- Implementar validación de email con regex
- Manejar errores con try-catch apropiados
- Incluir logging básico para requests
- Documentar cada endpoint con ejemplos
- Seguir convenciones de TypeScript estrictas