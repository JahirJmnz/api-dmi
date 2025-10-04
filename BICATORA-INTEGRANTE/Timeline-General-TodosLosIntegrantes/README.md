# Timeline General - Equipo SHD

Propósito: guiar el progreso del equipo con fechas, estado y próximos pasos.

## Estado actual (2025-10-04)
- Repositorio inicializado y ramas creadas: `main`, `qa`, `release`.
- Proyecto Next.js + TypeScript + ESLint configurado.
- API base operativa con CRUD de usuarios en memoria.
- Archivos de contexto y guía presentes en `CONTEXTO-GENERAL-DEL-PROYECTO/`.

## Vista Kanban (resumen)
- TODO:
  - Configurar protección de ramas (main, release) en remoto.
  - Crear 12 issues con criterios y asignaciones.
  - Documentación de pruebas (curl) y README de endpoints.
  - Logging simple por request.
- DOING:
  - Ninguno (a la espera de issues formales).
- DONE:
  - Setup Next.js + estructura API.
  - `app/lib/db.ts` con CRUD y validaciones básicas.
  - Endpoints: GET/POST `/api/users`, GET/PUT/DELETE `/api/users/[id]`.

## Hitos con fechas
- 2025-10-04: Setup del repo y del proyecto base (completado).
- 2025-10-04 (tarde): Crear y publicar los 12 issues con criterios de aceptación (pendiente).
- 2025-10-05: Asignación de issues y arranque de desarrollo por integrante (pendiente).
- 2025-10-06: Configurar protección de ramas `main` y `release` (pendiente).
- 2025-10-06–2025-10-07: Implementar validaciones (ISS-09) y logging (ISS-12) (pendiente).
- 2025-10-07: Documentación de pruebas con comandos `curl` (ISS-10) (pendiente).
- 2025-10-08: Revisiones y merges a `qa` (pendiente).
- 2025-10-09: Selección de features para `release` y PR hacia `main` (pendiente).

## Próximos pasos (ordenados)
1. Subir el repositorio a GitHub si no está público/compartido.
2. Configurar protección de ramas `main` y `release` (requerir PR + 1 review mínimo).
3. Crear los 12 issues con: descripción, criterios de aceptación, comandos de prueba, responsable.
4. Asignar issues a: Jair (ISS-01, ISS-02), Imanol (ISS-03, ISS-04), Antonio (ISS-05, ISS-06), Jahir (ISS-09, ISS-10, ISS-12). El resto repartir según prioridades.
5. Cada integrante crea rama `feature/<nombre>/ISS-XX-descripcion` y abre PR a `qa`.
6. Jahir revisa PRs, solicita cambios si aplica y hace merge a `qa`.
7. Con `qa` estable, seleccionar 1–2 features para `release` y abrir PR.
8. Hacer PR final de `release` a `main` cuando todo esté verificado.
9. Preparar demo y evidencias (capturas de PRs, `git shortlog -sne`).

## Reglas operativas
- Commits: `feat(users): listar usuarios #07`.
- PRs: hacia `qa` primero; enlazar el issue correspondiente.
- Documentación: actualizar `README` con ejemplos `curl` al completar un endpoint.
- Mantener `CONTEXTO-GENERAL-DEL-PROYECTO/` siempre visible y actualizado.
