## Guía de trabajo y contexto – Equipo SHD

Esta guía explica cómo vamos a trabajar para construir una API con Next.js cumpliendo lo que pide el profe: ramas, issues, PRs hacia `qa` primero, seleccionar 1–2 cosas a `release`, y evidenciar quién hizo qué.

### 1) Contexto (resumen de `Contexto.md`)

- **Repo con ramas**: trabajamos con `main`, `qa`, `release` y ramas por issue.
- **El líder define issues** y también contribuye código.
- **API con Next.js** sin frontend obligatorio.
- **Cada integrante colabora** en la API y trabaja en su subrama por issue.
- **Flujo de ramas**: todo va primero a `qa` → desde ahí, sólo 1–2 features seleccionadas pasan a `release`. `main` sirve como respaldo estable.
- **Objetivo de evaluación**: que se vea claramente el aporte de cada integrante.

### 2) Roles y responsabilidades

- **Líder (Jahir)**
  - Crear el repo y proteger ramas `main` y `release` (no commits directos; PR + 1 review).
  - Crear/gestionar issues (descripción, criterios de aceptación, cómo probar, asignado).
  - Coordinar revisiones de PR y decidir qué 1–2 features suben a `release`.
  - Aportar código (mínimo 2 issues) igual que el resto.
  - Mantener orden de etiquetas y PRs (enlazar issue con `#ID`).

- **Integrantes (Jair, Imanol, Antonio)**
  - Trabajar por issues en ramas propias: `feature/<nombre>/<ISSUE-xx>-<slug>`.
  - Abrir PR hacia `qa` con descripción, comandos de prueba (`curl`) y capturas.
  - Pedir y dar review (mínimo 1 aprobación) antes de merge a `qa`.
  - Actualizar PRs si hay comentarios, mantener commits claros (convencionales).

### 3) Estructura de ramas y flujo

- `main`: respaldo estable. No se trabaja directo aquí.
- `qa`: integración y pruebas de todo el equipo.
- `release`: sólo 1–2 features seleccionadas desde `qa` (no todo `qa`).
- `feature/<nombre>/<ISSUE-xx>-<slug>`: desarrollo por issue.
- `fix/<nombre>/<ISSUE-xx>-<slug>`: correcciones específicas por issue.

Flujo esperado:

`feature/<nombre>/<ISSUE>` → PR a `qa` → review → merge a `qa` → (líder selecciona 1–2) → PR a `release` → merge a `release` → opcional PR `release` → `main` como respaldo.

Branch protection recomendado (en GitHub → Settings → Branches):

- Proteger `main` y `release`: requerir PR, 1 review mínimo, evitar pushes directos.
- Dejar `qa` como rama de integración (no estrictamente protegida, pero se recomienda PR + review).

### 4) Convenciones

- **Nombres de ramas**: `feature/<nombre>/<ISSUE-07-crear-usuario>` (incluir tu nombre y el ID del issue).
- **Commits (Conventional Commits)**:
  - `feat(users): listar usuarios #07`
  - `fix(books): validar isbn #05`
  - `chore(ci): ajustar lint #10`
- **PRs**:
  - Base: `qa` (siempre primero). Sólo el líder hace PR de features seleccionadas hacia `release`.
  - Descripción: "Resuelve #ID", qué cambia, cómo probar (`curl`), capturas.
  - Checklist marcado (ver plantilla más abajo).
- **Etiquetas**: `feature`, `bug`, `docs`, `tech-debt`, `qa-ready`, `release-candidate`.

Plantilla sugerida para PR (copiar en la descripción):

```
Resuelve #<ID>

Resumen
- Qué hace este cambio y para qué.

Cómo probar
```bash
<pegar comandos curl>
```

Resultados esperados
- [ ] Status HTTP correcto
- [ ] Respuesta JSON con campos esperados

Checklist
- [ ] Referencié el issue con #ID
- [ ] Agregué pruebas manuales (curl)
- [ ] Recibí al menos 1 review
```

### 5) Stack y setup local

- **Stack**: Next.js (App Router), TypeScript, Node 18+, npm.
- **Setup**:
  ```bash
  npx create-next-app@latest api-dmi --ts --eslint --app --no-tailwind --use-npm
  cd api-dmi
  npm run dev
  # abrir http://localhost:3000
  ```
- **Ubicación de endpoints**: `app/api/<ruta>/route.ts`.

### 6) Definición de la API: “Biblioteca DMI”

- **Objetivo**: administrar usuarios, libros y préstamos, sin necesidad de frontend.
- **Entidades**:
  - Usuario: `{ id, nombre, email }`
  - Libro: `{ id, titulo, autor, isbn, disponible }`
  - Préstamo: `{ id, usuarioId, libroId, fechaPrestamo, fechaDevolucion }`
- **Persistencia**: para el curso basta memoria/archivo simple. Sugerido (opcional): módulo `app/lib/db.ts` que mantenga arrays en memoria mientras corre el server.

Estructura sugerida de proyecto (referencial):

```
app/
  api/
    ping/route.ts
    users/route.ts        # GET, POST
    users/[id]/route.ts   # GET, PUT, DELETE
    books/route.ts        # GET, POST
    books/[id]/route.ts   # GET, PUT, DELETE
    loans/route.ts        # GET, POST
    loans/[id]/return/route.ts  # PATCH (devolver libro)
  lib/
    db.ts                 # almacenamiento en memoria
```

### 7) Endpoints (definición y ejemplos)

- `GET /api/ping`
  - Responde `{ ok: true, timestamp }`.
  - Prueba:
    ```bash
    curl -i http://localhost:3000/api/ping
    ```

- `GET /api/users` – listar usuarios
  - Responde `[{ id, nombre, email }]`.
  - Prueba:
    ```bash
    curl -s http://localhost:3000/api/users | jq
    ```

- `POST /api/users` – crear usuario
  - Body: `{ "nombre": "Ana", "email": "ana@dmi.mx" }`
  - Responde `{ id, nombre, email }` con 201.
  - Prueba:
    ```bash
    curl -s -X POST http://localhost:3000/api/users \
      -H "Content-Type: application/json" \
      -d '{"nombre":"Ana","email":"ana@dmi.mx"}' | jq
    ```

- `GET /api/books` – listar libros
  - Responde `[{ id, titulo, autor, isbn, disponible }]`.
  - Prueba:
    ```bash
    curl -s http://localhost:3000/api/books | jq
    ```

- `POST /api/books` – crear libro
  - Body: `{ "titulo": "DDD", "autor": "Evans", "isbn": "978123" }`
  - Responde `{ id, titulo, autor, isbn, disponible: true }` con 201.
  - Prueba:
    ```bash
    curl -s -X POST http://localhost:3000/api/books \
      -H "Content-Type: application/json" \
      -d '{"titulo":"DDD","autor":"Evans","isbn":"978123"}' | jq
    ```

- `POST /api/loans` – registrar préstamo
  - Body: `{ "usuarioId": "u1", "libroId": "b1" }`
  - Marca el libro como `disponible: false` si procede.
  - Responde `{ id, usuarioId, libroId, fechaPrestamo }` con 201.
  - Prueba:
    ```bash
    curl -s -X POST http://localhost:3000/api/loans \
      -H "Content-Type: application/json" \
      -d '{"usuarioId":"u1","libroId":"b1"}' | jq
    ```

- `GET /api/loans` – listar préstamos
  - Responde `[{ id, usuarioId, libroId, fechaPrestamo, fechaDevolucion }]`.
  - Prueba:
    ```bash
    curl -s http://localhost:3000/api/loans | jq
    ```

- `PATCH /api/loans/<id>/return` – devolver libro
  - Marca `fechaDevolucion` y `disponible: true` en el libro.
  - Responde `{ id, ... , fechaDevolucion }`.
  - Prueba:
    ```bash
    curl -s -X PATCH http://localhost:3000/api/loans/<id>/return | jq
    ```

Plantillas mínimas de endpoints en Next.js (App Router):

```ts
// app/api/ping/route.ts
export function GET() {
  return Response.json({ ok: true, timestamp: Date.now() });
}
```

```ts
// app/api/users/route.ts (GET y POST)
export async function GET() {
  // devolver lista de usuarios
  return Response.json([]);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.nombre || !body?.email) {
    return new Response(JSON.stringify({ error: "Campos requeridos" }), { status: 400 });
  }
  // crear y devolver usuario
  return new Response(JSON.stringify({ id: "u1", ...body }), { status: 201 });
}
```

```ts
// app/api/books/route.ts (GET y POST)
export async function GET() {
  return Response.json([]);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.titulo || !body?.autor || !body?.isbn) {
    return new Response(JSON.stringify({ error: "Campos requeridos" }), { status: 400 });
  }
  return new Response(
    JSON.stringify({ id: "b1", titulo: body.titulo, autor: body.autor, isbn: body.isbn, disponible: true }),
    { status: 201 }
  );
}
```

### 8) Lista de issues (con criterios y pruebas)

Regla de ramas: cada subrama debe incluir el nombre del integrante.
Formato: `feature/<nombre>/<ISSUE-xx>-<slug>`

1. ISS-01 – Ping (Jair)
   - Rama: `feature/jair/ISSUE-01-ping`
   - Objetivo: `GET /api/ping` devuelve `{ ok: true, timestamp }`.
   - Criterios: 200 OK, JSON correcto.
   - Prueba:
     ```bash
     curl -i http://localhost:3000/api/ping
     ```
   - PR: `feature` → `qa` (review 1). Elegible para `release`.

2. ISS-02 – Listar usuarios (Imanol)
   - Rama: `feature/imanol/ISSUE-02-listar-usuarios`
   - Objetivo: `GET /api/users` devuelve lista.
   - Criterios: 200 OK, arreglo JSON.
   - Prueba:
     ```bash
     curl -s http://localhost:3000/api/users | jq
     ```
   - PR: `feature` → `qa`.

3. ISS-03 – Crear usuario (Imanol)
   - Rama: `feature/imanol/ISSUE-03-crear-usuario`
   - Objetivo: `POST /api/users` crea usuario válido.
   - Criterios: 201 Created; valida `nombre` y `email`.
   - Prueba:
     ```bash
     curl -s -X POST http://localhost:3000/api/users \
       -H "Content-Type: application/json" \
       -d '{"nombre":"Ana","email":"ana@dmi.mx"}' | jq
     ```
   - PR: `feature` → `qa`.

4. ISS-04 – Listar libros (Antonio)
   - Rama: `feature/antonio/ISSUE-04-listar-libros`
   - Objetivo: `GET /api/books`.
   - Criterios: 200 OK, arreglo JSON con `disponible`.
   - Prueba:
     ```bash
     curl -s http://localhost:3000/api/books | jq
     ```
   - PR: `feature` → `qa`.

5. ISS-05 – Crear libro (Antonio)
   - Rama: `feature/antonio/ISSUE-05-crear-libro`
   - Objetivo: `POST /api/books` valida `titulo`, `autor`, `isbn`.
   - Criterios: 201 Created, `disponible: true`.
   - Prueba:
     ```bash
     curl -s -X POST http://localhost:3000/api/books \
       -H "Content-Type: application/json" \
       -d '{"titulo":"DDD","autor":"Evans","isbn":"978123"}' | jq
     ```
   - PR: `feature` → `qa`.

6. ISS-06 – Registrar préstamo (Jair)
   - Rama: `feature/jair/ISSUE-06-registrar-prestamo`
   - Objetivo: `POST /api/loans` marca libro no disponible.
   - Criterios: 201 Created; valida existencia de `usuarioId` y `libroId`.
   - Prueba:
     ```bash
     curl -s -X POST http://localhost:3000/api/loans \
       -H "Content-Type: application/json" \
       -d '{"usuarioId":"u1","libroId":"b1"}' | jq
     ```
   - PR: `feature` → `qa`.

7. ISS-07 – Listar préstamos (Jair)
   - Rama: `feature/jair/ISSUE-07-listar-prestamos`
   - Objetivo: `GET /api/loans` lista.
   - Criterios: 200 OK, arreglo JSON.
   - Prueba:
     ```bash
     curl -s http://localhost:3000/api/loans | jq
     ```
   - PR: `feature` → `qa`.

8. ISS-08 – Devolver libro (Antonio)
   - Rama: `feature/antonio/ISSUE-08-devolver-libro`
   - Objetivo: `PATCH /api/loans/<id>/return` marca devolución y libro disponible.
   - Criterios: 200 OK; `fechaDevolucion` presente.
   - Prueba:
     ```bash
     curl -s -X PATCH http://localhost:3000/api/loans/<id>/return | jq
     ```
   - PR: `feature` → `qa`.

9. ISS-09 – Validaciones y errores comunes (Jahir)
   - Rama: `feature/jahir/ISSUE-09-validaciones-errores`
   - Objetivo: respuestas 400/404/409 con mensajes claros en endpoints.
   - Criterios: casos inválidos correctamente rechazados.
   - Pruebas: probar bodies inválidos y IDs inexistentes.
   - PR: `feature` → `qa`.

10. ISS-10 – Documentación de pruebas (Jahir)
    - Rama: `feature/jahir/ISSUE-10-doc-pruebas`
    - Objetivo: README con comandos `curl` por endpoint.
    - Criterios: todos los endpoints tienen ejemplo de prueba.
    - PR: `feature` → `qa`.

11. ISS-11 – Healthcheck y versión (Imanol)
    - Rama: `feature/imanol/ISSUE-11-health-version`
    - Objetivo: `GET /api/health` → `{ status: "ok", version }`.
    - Criterios: 200 OK, `version` desde `package.json`.
    - PR: `feature` → `qa`.

12. ISS-12 – Logging simple (Jahir)
    - Rama: `feature/jahir/ISSUE-12-logging`
    - Objetivo: log básico por request (método, url, tiempo).
    - Criterios: logs visibles en consola al hacer `curl`.
    - PR: `feature` → `qa`.

### 9) Qué se muestra al profe y cómo probar

- Mostrar 1–2 features promovidas a `release` (ej.: `ISS-01` Ping y `ISS-02` Listar usuarios).
- Enseñar issues asignados por persona y sus PRs (con capturas de los `curl`).
- Correr localmente `npm run dev` y ejecutar los `curl` del punto 7.

Evidencias rápidas por persona:

- En GitHub → Pull Requests → filtrar por autor: ver PRs y merges.
- Commits por autor (local):
  ```bash
  git shortlog -sne
  ```

### 10) Verificación del flujo que pide el profe

Checklist por entrega:

- [ ] Todas las ramas de trabajo son `feature/<nombre>/<ISSUE-xx>-<slug>` o `fix/...`.
- [ ] Todos los PRs van primero a `qa` y tienen 1 review mínimo.
- [ ] Sólo 1–2 PRs seleccionados van a `release` (no mezclar `qa` completo).
- [ ] `main` sólo se actualiza desde `release` como respaldo.
- [ ] Cada PR referencia su issue con `#ID` y trae comandos de prueba.
- [ ] Se puede demostrar con `git shortlog` y PRs quién hizo qué.

### 11) Instrucciones rápidas para cada integrante (y su LLM)

1. Asegúrate de estar en `qa`: `git checkout qa && git pull`.
2. Crea tu rama del issue: `git checkout -b feature/<tu-nombre>/ISSUE-xx-descripcion`.
3. Implementa el endpoint/s del issue; sigue las plantillas.
4. Añade commits convencionales referenciando `#xx`.
5. Prueba con `curl` y guarda capturas.
6. Sube la rama y abre PR hacia `qa` con plantilla de PR completa.
7. Pide review a un compañero; atiende comentarios.
8. Tras merge a `qa`, espera selección del líder para `release`.

Con esto, todos pueden trabajar en paralelo y demostrar aportes individuales de forma clara.


