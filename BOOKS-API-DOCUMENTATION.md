# API de Libros - Documentación de Pruebas

## Endpoints Implementados

### 1. GET /api/books - Listar todos los libros
```bash
curl -X GET http://localhost:3000/api/books
```

**Respuesta esperada:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "titulo": "El Quijote",
    "autor": "Miguel de Cervantes",
    "isbn": "978-84-376-0494-7",
    "disponible": true
  }
]
```

### 2. POST /api/books - Crear nuevo libro
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "isbn": "978-84-376-0495-4"
  }'
```

**Respuesta esperada (201):**
```json
{
  "id": "generated-uuid",
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "isbn": "978-84-376-0495-4",
  "disponible": true
}
```

### 3. GET /api/books/[id] - Obtener libro por ID
```bash
curl -X GET http://localhost:3000/api/books/550e8400-e29b-41d4-a716-446655440003
```

**Respuesta esperada (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "titulo": "El Quijote",
  "autor": "Miguel de Cervantes",
  "isbn": "978-84-376-0494-7",
  "disponible": true
}
```

### 4. PUT /api/books/[id] - Actualizar libro
```bash
curl -X PUT http://localhost:3000/api/books/550e8400-e29b-41d4-a716-446655440003 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Don Quijote de la Mancha",
    "disponible": false
  }'
```

**Respuesta esperada (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "titulo": "Don Quijote de la Mancha",
  "autor": "Miguel de Cervantes",
  "isbn": "978-84-376-0494-7",
  "disponible": false
}
```

### 5. DELETE /api/books/[id] - Eliminar libro
```bash
curl -X DELETE http://localhost:3000/api/books/550e8400-e29b-41d4-a716-446655440003
```

**Respuesta esperada (204):** Sin contenido

## Validaciones Implementadas

### Campos Requeridos
- `titulo`: Mínimo 2 caracteres
- `autor`: Mínimo 2 caracteres  
- `isbn`: Mínimo 10 caracteres

### Validaciones de Negocio
- **ISBN único**: No se permite duplicar ISBNs
- **Formato UUID**: IDs deben ser UUIDs válidos
- **Campos opcionales**: En PUT, todos los campos son opcionales

## Códigos de Error

- **400**: Bad Request (datos inválidos, formato UUID inválido)
- **404**: Not Found (libro no encontrado)
- **409**: Conflict (ISBN duplicado)
- **500**: Internal Server Error

## Ejemplos de Errores

### ISBN Duplicado (409)
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Libro Duplicado",
    "autor": "Autor Test",
    "isbn": "978-84-376-0494-7"
  }'
```

**Respuesta:**
```json
{
  "error": "El ISBN ya está registrado"
}
```

### Libro No Encontrado (404)
```bash
curl -X GET http://localhost:3000/api/books/invalid-uuid
```

**Respuesta:**
```json
{
  "error": "Libro no encontrado"
}
```

## Pruebas Automatizadas

Ejecutar el archivo de pruebas:
```bash
node test-books-api.js
```

Este script prueba todos los endpoints y muestra los resultados.
