import { NextRequest, NextResponse } from 'next/server';
import { bookStore } from '@/app/lib/booksStore'; // si da error, cambia por ../../lib/booksStore

export async function GET() {
  try {
    return NextResponse.json({ ok: true, data: bookStore.list() }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = bookStore.create({
      titulo: body.titulo,
      autor: body.autor,
      isbn: body.isbn,
      disponible: body.disponible,
    });
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (e: any) {
    const msg = String(e?.message || 'Error');
    const status = /faltante|inválido|booleano|registrado/i.test(msg) ? 400 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}
