import { NextRequest, NextResponse } from 'next/server';
import { bookDb } from '@/app/lib/db';

// GET /api/books/[id] - Obtener libro por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validar formato UUID
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(id)) {
      return NextResponse.json(
        { message: 'El ID proporcionado no es un UUID válido.' },
        { status: 400 }
      );
    }
    
    const book = bookDb.getBookById(id);
    
    if (!book) {
      return NextResponse.json(
        { message: 'Libro no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error('Error al obtener libro:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/books/[id] - Actualizar libro
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validar formato UUID
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(id)) {
      return NextResponse.json(
        { message: 'El ID proporcionado no es un UUID válido.' },
        { status: 400 }
      );
    }
    
    // Verificar que el libro existe
    const existingBook = bookDb.getBookById(id);
    if (!existingBook) {
      return NextResponse.json(
        { message: 'Libro no encontrado' },
        { status: 404 }
      );
    }
    
    // Validar campos si se proporcionan
    if (body.titulo !== undefined) {
      if (!body.titulo || body.titulo.length < 2) {
        return NextResponse.json(
          { message: 'El título debe tener al menos 2 caracteres' },
          { status: 400 }
        );
      }
    }
    
    if (body.autor !== undefined) {
      if (!body.autor || body.autor.length < 2) {
        return NextResponse.json(
          { message: 'El autor debe tener al menos 2 caracteres' },
          { status: 400 }
        );
      }
    }
    
    if (body.isbn !== undefined) {
      // Validar formato de ISBN
      if (body.isbn.length < 10) {
        return NextResponse.json(
          { message: 'El ISBN debe tener al menos 10 caracteres' },
          { status: 400 }
        );
      }
      
      // Validar que el ISBN no exista en otro libro
      if (bookDb.isbnExists(body.isbn, id)) {
        return NextResponse.json(
          { message: 'El ISBN ya está registrado por otro libro' },
          { status: 409 }
        );
      }
    }
    
    // Preparar datos para actualización
    const updateData: any = {};
    if (body.titulo !== undefined) {
      updateData.titulo = body.titulo.trim();
    }
    if (body.autor !== undefined) {
      updateData.autor = body.autor.trim();
    }
    if (body.isbn !== undefined) {
      updateData.isbn = body.isbn.trim();
    }
    if (body.disponible !== undefined) {
      updateData.disponible = Boolean(body.disponible);
    }
    
    // Actualizar libro
    const updatedBook = bookDb.updateBook(id, updateData);
    
    if (!updatedBook) {
      return NextResponse.json(
        { message: 'Error al actualizar el libro' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    
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

// DELETE /api/books/[id] - Eliminar libro
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validar formato UUID
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(id)) {
      return NextResponse.json(
        { message: 'El ID proporcionado no es un UUID válido.' },
        { status: 400 }
      );
    }
    
    // Verificar que el libro existe
    const existingBook = bookDb.getBookById(id);
    if (!existingBook) {
      return NextResponse.json(
        { message: 'Libro no encontrado' },
        { status: 404 }
      );
    }
    
    // Eliminar libro
    const deleted = bookDb.deleteBook(id);
    
    if (!deleted) {
      return NextResponse.json(
        { message: 'Error al eliminar el libro' },
        { status: 500 }
      );
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
