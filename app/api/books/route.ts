import { NextRequest, NextResponse } from 'next/server';
import { bookDb, Book } from '@/app/lib/db';

// GET /api/books - Listar todos los libros
export async function GET() {
  try {
    const books = bookDb.getAllBooks();
    
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error al obtener libros:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/books - Crear nuevo libro
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.titulo || !body.autor || !body.isbn) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos: titulo, autor, isbn' },
        { status: 400 }
      );
    }
    
    // Validar longitud del título
    if (body.titulo.length < 2) {
      return NextResponse.json(
        { message: 'El título debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }
    
    // Validar longitud del autor
    if (body.autor.length < 2) {
      return NextResponse.json(
        { message: 'El autor debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }
    
    // Validar formato de ISBN (básico)
    if (body.isbn.length < 10) {
      return NextResponse.json(
        { message: 'El ISBN debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }
    
    // Validar que el ISBN no exista
    if (bookDb.isbnExists(body.isbn)) {
      return NextResponse.json(
        { message: 'El ISBN ya está registrado' },
        { status: 409 }
      );
    }
    
    // Crear libro
    const newBook = bookDb.createBook({
      titulo: body.titulo.trim(),
      autor: body.autor.trim(),
      isbn: body.isbn.trim(),
      disponible: true
    });
    
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error al crear libro:', error);
    
    // Si es error de JSON parsing
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: 'Cuerpo de la solicitud JSON mal formado.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
