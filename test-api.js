#!/usr/bin/env node

/**
 * Script de tests automatizados para la API de biblioteca
 * Ejecutar con: node test-api.js
 */

const BASE_URL = 'http://localhost:3000/api';

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let passedTests = 0;
let totalTests = 0;
const testResults = [];

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function makeRequest(method, endpoint, body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, options);
    // For 204 No Content, data will be empty
    if (response.status === 204) {
      return { status: 204, data: null, ok: response.ok };
    }
    const data = await response.text();
    let jsonData;
    
    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = data;
    }
    
    return {
      status: response.status,
      data: jsonData,
      ok: response.ok
    };
  } catch (error) {
    return {
      status: 0,
      data: { error: error.message },
      ok: false
    };
  }
}

function test(name, condition) {
  totalTests++;
  if (condition) {
    passedTests++;
    testResults.push({ name, passed: true });
  } else {
    testResults.push({ name, passed: false });
  }
}

async function runCategoryTests() {
  log('\n📂 Tests de Categorías (CRUD Completo):', 'yellow');
  
  // 1. POST - Crear una nueva categoría para los tests
  const uniqueName = `Test Category ${Date.now()}`;
  const createResponse = await makeRequest('POST', '/categories', {
    nombre: uniqueName,
    descripcion: 'Test Description',
    activa: true
  });
  test('POST /api/categories crea categoría con 201', createResponse.status === 201);
  test('POST /api/categories retorna categoría con id', createResponse.data?.id != null);
  
  const categoryId = createResponse.data?.id;
  if (!categoryId) {
    log('Error: No se pudo crear la categoría de prueba. Abortando tests de categorías.', 'red');
    return;
  }

  // 2. GET (all) - Listar categorías
  const listResponse = await makeRequest('GET', '/categories');
  test('GET /api/categories responde con 200', listResponse.status === 200);
  test('GET /api/categories retorna un array', Array.isArray(listResponse.data));
  test('GET /api/categories contiene la nueva categoría', listResponse.data.some(c => c.id === categoryId));

  // 3. GET (by id) - Obtener la categoría creada
  const getByIdResponse = await makeRequest('GET', `/categories/${categoryId}`);
  test('GET /api/categories/:id responde con 200 para un ID válido', getByIdResponse.status === 200);
  test('GET /api/categories/:id retorna el objeto correcto', getByIdResponse.data?.id === categoryId);

  const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
  const getNotFoundResponse = await makeRequest('GET', `/categories/${nonExistentId}`);
  test('GET /api/categories/:id responde con 404 para un ID inexistente', getNotFoundResponse.status === 404);
  
  const invalidIdResponse = await makeRequest('GET', '/categories/invalid-id');
  test('GET /api/categories/:id responde con 400 para un ID inválido', invalidIdResponse.status === 400);

  // 4. PUT - Actualizar la categoría
  const updatedName = `Updated Category ${Date.now()}`;
  const putResponse = await makeRequest('PUT', `/categories/${categoryId}`, {
    nombre: updatedName,
    activa: false
  });
  test('PUT /api/categories/:id responde con 200', putResponse.status === 200);
  test('PUT /api/categories/:id retorna el objeto actualizado', putResponse.data?.nombre === updatedName && putResponse.data?.activa === false);

  const putNotFoundResponse = await makeRequest('PUT', `/categories/${nonExistentId}`, { nombre: 'test' });
  test('PUT /api/categories/:id responde con 404 para un ID inexistente', putNotFoundResponse.status === 404);

  // 5. POST/PUT Validaciones de conflicto
  const conflictResponse = await makeRequest('POST', '/categories', { nombre: updatedName, descripcion: '...', activa: true });
  test('POST /api/categories responde con 409 para un nombre duplicado', conflictResponse.status === 409);

  // 6. DELETE - Eliminar la categoría
  const deleteResponse = await makeRequest('DELETE', `/categories/${categoryId}`);
  test('DELETE /api/categories/:id responde con 204 para una eliminación exitosa', deleteResponse.status === 204);

  const deleteNotFoundResponse = await makeRequest('DELETE', `/categories/${categoryId}`);
  test('DELETE /api/categories/:id responde con 404 al intentar eliminar de nuevo', deleteNotFoundResponse.status === 404);
}

async function runTests() {
  log('🧪 Ejecutando tests automatizados para API de biblioteca...\n', 'blue');
  
  // Test 1: Health Check
  log('📋 Tests de Health Check:', 'yellow');
  const pingResponse = await makeRequest('GET', '/ping');
  test('GET /api/ping responde con 200', pingResponse.status === 200);
  test('GET /api/ping tiene campo ok', pingResponse.data?.ok === true);
  
  // Test 2: Usuarios (a implementar)
  log('\n👥 Tests de Usuarios (a implementar):', 'yellow');
  const usersResponse = await makeRequest('GET', '/users');
  test('GET /api/users responde con 200', usersResponse.status === 200);
  
  // Test 3: Libros (a implementar)
  log('\n📚 Tests de Libros (a implementar):', 'yellow');
  const booksResponse = await makeRequest('GET', '/books');
  test('GET /api/books responde con 200', booksResponse.status === 200);
  
  // Test 4: Categorías
  await runCategoryTests();
  
  // Test 5: Préstamos (a implementar)
  log('\n📖 Tests de Préstamos (a implementar):', 'yellow');
  const loansResponse = await makeRequest('GET', '/loans');
  test('GET /api/loans responde con 200', loansResponse.status === 200);

  // Imprimir resultados
  log(`\n📊 Resumen de Tests:`, 'blue');
  testResults.forEach(result => {
    log(result.passed ? `✓ ${result.name}` : `✗ ${result.name}`, result.passed ? 'green' : 'red');
  });
  
  log(`\nPasaron: ${passedTests}/${totalTests} tests`, passedTests === totalTests ? 'green' : 'red');
  
  if (passedTests === totalTests) {
    log('🎉 ¡Todos los tests pasaron! La API está funcionando correctamente.', 'green');
    process.exit(0);
  } else {
    log('❌ Algunos tests fallaron. Revisa la implementación.', 'red');
    process.exit(1);
  }
}

// Verificar si fetch está disponible (Node 18+)
if (typeof fetch === 'undefined') {
  log('❌ Error: fetch no está disponible. Usa Node.js 18+ o instala node-fetch', 'red');
  process.exit(1);
}

runTests().catch(error => {
  log(`❌ Error ejecutando tests: ${error.message}`, 'red');
  process.exit(1);
});