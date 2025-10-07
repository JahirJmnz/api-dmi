// Pruebas para la API de libros - Issue #32
// Ejecutar con: node test-books-api.js

const baseUrl = 'http://localhost:3000/api';

async function testBooksAPI() {
  console.log('🧪 Probando API de libros...\n');

  try {
    // 1. GET /api/books - Listar libros
    console.log('1. GET /api/books - Listar libros');
    const listResponse = await fetch(`${baseUrl}/books`);
    const books = await listResponse.json();
    console.log('Status:', listResponse.status);
    console.log('Response:', JSON.stringify(books, null, 2));
    console.log('');

    // 2. POST /api/books - Crear libro
    console.log('2. POST /api/books - Crear libro');
    const newBook = {
      titulo: 'El Quijote',
      autor: 'Miguel de Cervantes',
      isbn: '978-84-376-0494-7'
    };
    
    const createResponse = await fetch(`${baseUrl}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    });
    
    const createdBook = await createResponse.json();
    console.log('Status:', createResponse.status);
    console.log('Response:', JSON.stringify(createdBook, null, 2));
    console.log('');

    const bookId = createdBook.id;

    // 3. GET /api/books/[id] - Obtener libro específico
    console.log('3. GET /api/books/[id] - Obtener libro específico');
    const getResponse = await fetch(`${baseUrl}/books/${bookId}`);
    const book = await getResponse.json();
    console.log('Status:', getResponse.status);
    console.log('Response:', JSON.stringify(book, null, 2));
    console.log('');

    // 4. PUT /api/books/[id] - Actualizar libro
    console.log('4. PUT /api/books/[id] - Actualizar libro');
    const updateData = {
      titulo: 'Don Quijote de la Mancha',
      disponible: false
    };
    
    const updateResponse = await fetch(`${baseUrl}/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const updatedBook = await updateResponse.json();
    console.log('Status:', updateResponse.status);
    console.log('Response:', JSON.stringify(updatedBook, null, 2));
    console.log('');

    // 5. DELETE /api/books/[id] - Eliminar libro
    console.log('5. DELETE /api/books/[id] - Eliminar libro');
    const deleteResponse = await fetch(`${baseUrl}/books/${bookId}`, {
      method: 'DELETE'
    });
    console.log('Status:', deleteResponse.status);
    console.log('Response:', deleteResponse.status === 204 ? 'No Content (204)' : await deleteResponse.text());
    console.log('');

    // 6. Verificar que el libro fue eliminado
    console.log('6. Verificar eliminación - GET /api/books/[id]');
    const verifyResponse = await fetch(`${baseUrl}/books/${bookId}`);
    console.log('Status:', verifyResponse.status);
    console.log('Response:', await verifyResponse.text());
    console.log('');

    console.log('✅ Todas las pruebas completadas');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

// Ejecutar pruebas
testBooksAPI();
