import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

type Loan = {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  dueDate: string; // ISO
  returned: boolean;
  createdAt: string;
  returnedAt?: string | null;
};

// “Base de datos” en memoria (global al runtime del server)
const store: { loans: Loan[] } = (globalThis as any);
if (!store.loans) {
  store.loans = [];
}

// GET /api/loans — listar préstamos
export async function GET() {
  return NextResponse.json({ ok: true, data: store.loans }, { status: 200 });
}

// POST /api/loans — crear préstamo
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null) as Partial<Loan> | null;
    if (!body) {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    const { userId, bookId, amount, dueDate } = body;

    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!userId || !uuidRe.test(String(userId))) {
      return NextResponse.json({ error: 'userId es obligatorio y UUID válido' }, { status: 400 });
    }
    if (!bookId || !uuidRe.test(String(bookId))) {
      return NextResponse.json({ error: 'bookId es obligatorio y UUID válido' }, { status: 400 });
    }

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      return NextResponse.json({ error: 'amount debe ser número > 0' }, { status: 400 });
    }

    const d = new Date(String(dueDate));
    if (!dueDate || isNaN(d.getTime())) {
      return NextResponse.json({ error: 'dueDate debe ser fecha ISO válida' }, { status: 400 });
    }

    const loan: Loan = {
      id: randomUUID(),
      userId: String(userId),
      bookId: String(bookId),
      amount: amt,
      dueDate: d.toISOString(),
      returned: false,
      createdAt: new Date().toISOString(),
      returnedAt: null
    };

    store.loans.unshift(loan);
    return NextResponse.json({ ok: true, data: loan }, { status: 201 });
  } catch (err) {
    console.error('Error POST /loans', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
