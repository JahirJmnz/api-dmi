# Bitácora - Antonio Hernández

- Fecha: 2025-10-06
- Rol: Desarrollador Backend

## Actividades realizadas
- Pendiente de inicio. Entorno del repositorio listo para clonar.

## Estado del Proyecto
- ✅ **API Usuarios COMPLETADA** por Jahir (ISS-01) - PR #35 hacia qa
- ⏳ **API Libros PENDIENTE** - Imanol (ISS-02)
- ⏳ **API Préstamos PENDIENTE** - Jair (ISS-03)
- ⏳ **API Categorías PENDIENTE** - Tu asignación (ISS-04)

## Asignaciones
- ISS-04: API Categorías - CRUD Completo - **LISTO PARA INICIAR**
  - GET, POST, GET/:id, PUT/:id, DELETE/:id
  - Base de datos ya configurada en `app/lib/db.ts`
  - Funciones CRUD ya implementadas: `categoryDb.*`

## Próximos pasos
1. Clonar el repo y crear rama: `feature/antonio/ISS-04-api-categorias-crud`.
2. Implementar todos los endpoints de categorías usando `categoryDb` de `app/lib/db.ts`:
   - `app/api/categories/route.ts` (GET, POST)
   - `app/api/categories/[id]/route.ts` (GET, PUT, DELETE)
3. Ejecutar tests automatizados: `npm test`.
4. Probar con `curl` y documentar en el PR.
5. Abrir PR hacia `qa` y solicitar revisión a Jahir.

## Notas
- Seguir convención de commits: `feat(categories): crear categoría #04`.
- Los PRs siempre van a `qa` primero, enlazando el issue.
- **IMPORTANTE**: Usar `await params` en Next.js 15+ para rutas dinámicas.
- La API de usuarios ya está funcionando como referencia.
- Validar que el nombre de categoría sea único.
