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
- Configurar protección de ramas en remoto: `main` y `release` (PR + 1 review mínimo).
- Crear los 12 issues con descripción, criterios de aceptación y responsables.
- Trabajar en:
  - ISS-09: Validaciones y errores comunes (400/404/409).
  - ISS-10: Documentación de pruebas (README + comandos `curl`).
  - ISS-12: Logging simple por request.

## Tareas y estado
- [x] [COMPLETADO] Publicar ramas remotas: `qa` y `release` (push inicial) - **Evidencia**: `git push origin qa release` exitoso
- [ ] [PENDIENTE] Proteger ramas `main` y `release` en GitHub (PR obligatorio + 1 review)
- [ ] [PENDIENTE] Crear los 12 issues en GitHub (descripción, criterios, comandos `curl`, responsable)
- [ ] [PENDIENTE] Alinear asignaciones entre guía y bitácoras individuales
- [x] [COMPLETADO] Actualizar `README.md` del proyecto con endpoints y ejemplos `curl` - **Evidencia**: README completo con todos los endpoints y comandos curl
- [x] [COMPLETADO] Añadir `.github/pull_request_template.md` con checklist de pruebas/review - **Evidencia**: Archivo creado en `.github/pull_request_template.md`
- [x] [COMPLETADO] Implementar logging básico por request (`middleware.ts` con método, URL y tiempo) - **Evidencia**: `middleware.ts` creado y funcionando
- [x] [COMPLETADO] Agregar endpoint `GET /api/ping` (health sencillo) - **Evidencia**: `curl http://localhost:3000/api/ping` responde correctamente
- [x] [COMPLETADO] Validar `id` como UUID en endpoints o normalizar datos semilla a UUID - **Evidencia**: IDs normalizados a UUID y validación implementada
- [x] [COMPLETADO] ISS-09: Validaciones y errores comunes (400/404/409) - **Evidencia**: Validaciones implementadas en todos los endpoints
- [x] [COMPLETADO] ISS-10: Documentación de pruebas (README + `curl`) - **Evidencia**: README actualizado con ejemplos curl
- [x] [COMPLETADO] ISS-12: Logging simple por request - **Evidencia**: Middleware implementado y funcionando

## Notas
- Los PRs deben ir primero a `qa`. Promover a `release` solo lo validado.
- Mantener visibles `CONTEXTO-GENERAL-DEL-PROYECTO/Guia-de-trabajo-y-contexto.md` y `Contexto.md`.
