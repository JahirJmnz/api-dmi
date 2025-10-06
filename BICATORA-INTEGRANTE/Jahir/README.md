# Bitácora - Jahir Jiménez

- Fecha: 2025-10-04
- Rol: Líder del equipo SHD

## Actividades realizadas
- Inicialicé el repositorio Git y configuré ramas: `main`, `qa`, `release`.
- Generé el proyecto base con Next.js + TypeScript + ESLint.
- Creé el módulo `app/lib/db.ts` con almacenamiento en memoria para API de biblioteca.
- Implementé endpoint base:
  - `GET /api/ping` (health check básico)
- Reestructuré el proyecto para API de biblioteca (usuarios, libros, préstamos).
- Creé 10 issues correctamente asignados a cada integrante con tests.
- Actualicé documentación para reflejar API de biblioteca.
- Configuré protección de ramas y plantillas de PR.

## Entregables creados
- `app/lib/db.ts` (módulo de base de datos para biblioteca)
- `app/api/ping/route.ts` (health check básico)
- `middleware.ts` (logging de requests)
- `.github/pull_request_template.md` (plantilla de PR)
- `README.md` (documentación completa de API de biblioteca)
- Configuración base (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`).

## Pendientes personales (siguientes)
- Revisar PRs de compañeros y hacer merge a `qa`.
- Seleccionar 1-2 features para promover a `release`.
- Trabajar en:
  - ISS-01: API Usuarios - CRUD Completo
  - Coordinación general del equipo.

## Tareas y estado
- [x] [COMPLETADO] Publicar ramas remotas: `qa` y `release` (push inicial) - **Evidencia**: `git push origin qa release` exitoso
- [x] [COMPLETADO] Proteger ramas `main` y `release` en GitHub (PR obligatorio + 1 review) - **Evidencia**: Protección configurada manualmente en GitHub
- [x] [COMPLETADO] Reestructurar proyecto para API de biblioteca - **Evidencia**: Eliminada API de usuarios, creada estructura para biblioteca
- [x] [COMPLETADO] Crear 10 issues correctamente asignados con tests - **Evidencia**: Issues #21-30 creados y asignados a cada integrante
- [x] [COMPLETADO] Alinear asignaciones entre guía y bitácoras individuales - **Evidencia**: Bitácoras actualizadas con nuevas asignaciones
- [x] [COMPLETADO] Actualizar `README.md` del proyecto con endpoints y ejemplos `curl` - **Evidencia**: README completo con todos los endpoints y comandos curl
- [x] [COMPLETADO] Añadir `.github/pull_request_template.md` con checklist de pruebas/review - **Evidencia**: Archivo creado en `.github/pull_request_template.md`
- [x] [COMPLETADO] Implementar logging básico por request (`middleware.ts` con método, URL y tiempo) - **Evidencia**: `middleware.ts` creado y funcionando
- [x] [COMPLETADO] Agregar endpoint `GET /api/ping` (health sencillo) - **Evidencia**: `curl http://localhost:3000/api/ping` responde correctamente
- [x] [COMPLETADO] Validar `id` como UUID en endpoints o normalizar datos semilla a UUID - **Evidencia**: IDs normalizados a UUID y validación implementada
- [x] [COMPLETADO] ISS-09: Validaciones y errores comunes (400/404/409) - **Evidencia**: Validaciones implementadas en todos los endpoints
- [x] [COMPLETADO] ISS-10: Documentación de pruebas (README + `curl`) - **Evidencia**: README actualizado con ejemplos curl
- [x] [COMPLETADO] ISS-12: Logging simple por request - **Evidencia**: Middleware implementado y funcionando

## Issues creados en GitHub (4 total)

### ⏳ PENDIENTES (4 issues) - CRUD Completos asignados equitativamente
- **ISS-01**: API Usuarios - CRUD Completo (@JahirJmnz)
  - GET, POST, GET/:id, PUT/:id, DELETE/:id
- **ISS-02**: API Libros - CRUD Completo (@Imamtz0104)
  - GET, POST, GET/:id, PUT/:id, DELETE/:id
- **ISS-03**: API Préstamos - CRUD Completo (@Jairhc2)
  - GET, POST, GET/:id, PATCH/:id/return, DELETE/:id
- **ISS-04**: API Categorías - CRUD Completo (@Antonioh1n)
  - GET, POST, GET/:id, PUT/:id, DELETE/:id

### 📊 Distribución por integrante
- **Jahir**: 1 issue (ISS-01 - API Usuarios completa)
- **Imanol**: 1 issue (ISS-02 - API Libros completa)
- **Jair**: 1 issue (ISS-03 - API Préstamos completa)
- **Antonio**: 1 issue (ISS-04 - API Categorías completa)

### 🧪 Tests automatizados
- Script `test-api.js` creado para validación automática
- Cada integrante debe ejecutar `npm test` antes de hacer PR
- Tests validan funcionalidad completa de cada API

## Notas
- Los PRs deben ir primero a `qa`. Promover a `release` solo lo validado.
- Mantener visibles `CONTEXTO-GENERAL-DEL-PROYECTO/Guia-de-trabajo-y-contexto.md` y `Contexto.md`.
