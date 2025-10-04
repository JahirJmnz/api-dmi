# Bitácora - Jahir Jiménez

- Fecha: 2025-10-04
- Rol: Líder del equipo SHD

## Actividades realizadas
- Inicialicé el repositorio Git y configuré ramas: `main`, `qa`, `release`.
- Generé el proyecto base con Next.js + TypeScript + ESLint.
- Creé el módulo `app/lib/db.ts` con almacenamiento en memoria y funciones CRUD.
- Implementé endpoints base de la API:
  - `GET /api/users`
  - `POST /api/users`
  - `GET /api/users/[id]`
  - `PUT /api/users/[id]`
  - `DELETE /api/users/[id]`
- Realicé el commit inicial con la estructura funcionando localmente.
- Mantuve y restauré archivos de contexto/guía cuando fue necesario.

## Entregables creados
- `app/lib/db.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- Configuración base (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`).

## Pendientes personales (siguientes)
- Revisar PRs de compañeros y hacer merge a `qa`.
- Seleccionar 1-2 features para promover a `release`.
- Trabajar en:
  - ISS-16: Documentación completa y pruebas.
  - Coordinación general del equipo.

## Tareas y estado
- [x] [COMPLETADO] Publicar ramas remotas: `qa` y `release` (push inicial) - **Evidencia**: `git push origin qa release` exitoso
- [x] [COMPLETADO] Proteger ramas `main` y `release` en GitHub (PR obligatorio + 1 review) - **Evidencia**: Protección configurada manualmente en GitHub
- [x] [COMPLETADO] Crear los 12 issues en GitHub (descripción, criterios, comandos `curl`, responsable) - **Evidencia**: 17 issues creados (6 completados + 11 pendientes)
- [x] [COMPLETADO] Alinear asignaciones entre guía y bitácoras individuales - **Evidencia**: Bitácoras actualizadas con nuevas asignaciones
- [x] [COMPLETADO] Actualizar `README.md` del proyecto con endpoints y ejemplos `curl` - **Evidencia**: README completo con todos los endpoints y comandos curl
- [x] [COMPLETADO] Añadir `.github/pull_request_template.md` con checklist de pruebas/review - **Evidencia**: Archivo creado en `.github/pull_request_template.md`
- [x] [COMPLETADO] Implementar logging básico por request (`middleware.ts` con método, URL y tiempo) - **Evidencia**: `middleware.ts` creado y funcionando
- [x] [COMPLETADO] Agregar endpoint `GET /api/ping` (health sencillo) - **Evidencia**: `curl http://localhost:3000/api/ping` responde correctamente
- [x] [COMPLETADO] Validar `id` como UUID en endpoints o normalizar datos semilla a UUID - **Evidencia**: IDs normalizados a UUID y validación implementada
- [x] [COMPLETADO] ISS-09: Validaciones y errores comunes (400/404/409) - **Evidencia**: Validaciones implementadas en todos los endpoints
- [x] [COMPLETADO] ISS-10: Documentación de pruebas (README + `curl`) - **Evidencia**: README actualizado con ejemplos curl
- [x] [COMPLETADO] ISS-12: Logging simple por request - **Evidencia**: Middleware implementado y funcionando

## Issues creados en GitHub (17 total)

### ✅ COMPLETADOS (6 issues)
- ISS-01: GET /api/ping - Health check básico
- ISS-02: GET /api/users - Listar usuarios  
- ISS-03: POST /api/users - Crear usuario
- ISS-04: GET /api/users/:id - Obtener usuario
- ISS-05: PUT /api/users/:id - Actualizar usuario
- ISS-06: DELETE /api/users/:id - Eliminar usuario

### ⏳ PENDIENTES (11 issues)
- ISS-06: GET /api/books - Listar libros (Antonio)
- ISS-07: POST /api/books - Crear libro (Antonio)
- ISS-08: GET /api/books/:id - Obtener libro (Antonio)
- ISS-09: PUT /api/books/:id - Actualizar libro (Antonio)
- ISS-10: DELETE /api/books/:id - Eliminar libro (Antonio)
- ISS-11: POST /api/loans - Registrar préstamo (Jair)
- ISS-12: GET /api/loans - Listar préstamos (Jair)
- ISS-13: PATCH /api/loans/:id/return - Devolver libro (Antonio)
- ISS-14: GET /api/health - Health check avanzado (Imanol)
- ISS-15: Validaciones mejoradas y manejo de errores (Imanol)
- ISS-16: Documentación completa y pruebas (Jahir)

## Notas
- Los PRs deben ir primero a `qa`. Promover a `release` solo lo validado.
- Mantener visibles `CONTEXTO-GENERAL-DEL-PROYECTO/Guia-de-trabajo-y-contexto.md` y `Contexto.md`.
