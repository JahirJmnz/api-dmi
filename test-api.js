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

function test(name, testFn) {
  totalTests++;
  try {
    const result = testFn();
    if (result) {
      passedTests++;
      log(`✓ ${name}`, 'green');
    } else {
      log(`✗ ${name}`, 'red');
    }
  } catch (error) {
    log(`✗ ${name} - Error: ${error.message}`, 'red');
  }
}

async function runTests() {
  log('🧪 Ejecutando tests automatizados para API de biblioteca...\n', 'blue');
  
  // Test 1: Health Check
  log('📋 Tests de Health Check:', 'yellow');
  const pingResponse = await makeRequest('GET', '/ping');
  test('GET /api/ping responde con 200', () => pingResponse.status === 200);
  test('GET /api/ping tiene campo ok', () => pingResponse.data?.ok === true);
  
  // Test 2: Usuarios
  log('\n👥 Tests de Usuarios:', 'yellow');
  const usersResponse = await makeRequest('GET', '/users');
  test('GET /api/users responde con 200', () => usersResponse.status === 200);
  test('GET /api/users retorna array', () => Array.isArray(usersResponse.data));
  
  const createUserResponse = await makeRequest('POST', '/users', {
    nombre: 'Test User',
    email: 'test@example.com'
  });
  test('POST /api/users crea usuario con 201', () => createUserResponse.status === 201);
  test('POST /api/users retorna usuario con id', () => createUserResponse.data?.id);
  
  // Test 3: Libros
  log('\n📚 Tests de Libros:', 'yellow');
  const booksResponse = await makeRequest('GET', '/books');
  test('GET /api/books responde con 200', () => booksResponse.status === 200);
  test('GET /api/books retorna array', () => Array.isArray(booksResponse.data));
  
  const createBookResponse = await makeRequest('POST', '/books', {
    titulo: 'Test Book',
    autor: 'Test Author',
    isbn: '978-0-123456-78-9'
  });
  test('POST /api/books crea libro con 201', () => createBookResponse.status === 201);
  test('POST /api/books retorna libro con id', () => createBookResponse.data?.id);
  
  // Test 4: Categorías
  log('\n📂 Tests de Categorías:', 'yellow');
  const categoriesResponse = await makeRequest('GET', '/categories');
  test('GET /api/categories responde con 200', () => categoriesResponse.status === 200);
  test('GET /api/categories retorna array', () => Array.isArray(categoriesResponse.data));
  
  const createCategoryResponse = await makeRequest('POST', '/categories', {
    nombre: 'Test Category',
    descripcion: 'Test Description',
    activa: true
  });
  test('POST /api/categories crea categoría con 201', () => createCategoryResponse.status === 201);
  test('POST /api/categories retorna categoría con id', () => createCategoryResponse.data?.id);
  
  // Test 5: Préstamos
  log('\n📖 Tests de Préstamos:', 'yellow');
  const loansResponse = await makeRequest('GET', '/loans');
  test('GET /api/loans responde con 200', () => loansResponse.status === 200);
  test('GET /api/loans retorna array', () => Array.isArray(loansResponse.data));
  
  // Test 6: Validaciones
  log('\n🔍 Tests de Validaciones:', 'yellow');
  const invalidUserResponse = await makeRequest('POST', '/users', {
    nombre: 'Test'
    // email faltante
  });
  test('POST /api/users sin email retorna 400', () => invalidUserResponse.status === 400);
  
  const invalidBookResponse = await makeRequest('POST', '/books', {
    titulo: 'Test'
    // autor e isbn faltantes
  });
  test('POST /api/books sin campos requeridos retorna 400', () => invalidBookResponse.status === 400);
  
  // Resumen
  log(`\n📊 Resumen de Tests:`, 'blue');
  log(`Pasaron: ${passedTests}/${totalTests} tests`, passedTests === totalTests ? 'green' : 'red');
  
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
