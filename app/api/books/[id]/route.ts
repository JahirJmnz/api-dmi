import { NextRequest, NextResponse } from 'next/server';
import { bookStore } from '@/app/lib/booksStore';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const book = bookStore.get(params.id);
  return book
    ? NextResponse.json({ ok: true, data: book }, { status: 200 })
    : NextResponse.json({ ok: false, error: 'Libro no encontrado' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    const updated = bookStore.update(params.id, body);
    return updated
      ? NextResponse.json({ ok: true, data: updated }, { status: 200 })
      : NextResponse.json({ ok: false, error: 'Libro no encontrado' }, { status: 404 });
  } catch (e: any) {
    const msg = String(e?.message || 'Error');
    const status = /faltante|inválido|booleano|registrado/i.test(msg) ? 400 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const removed = bookStore.remove(params.id);
  return removed
    ? NextResponse.json({ ok: true, message: 'Eliminado' }, { status: 200 })
    : NextResponse.json({ ok: false, error: 'Libro no encontrado' }, { status: 404 });
}
