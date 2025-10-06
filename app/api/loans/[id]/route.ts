import { NextResponse } from 'next/server';

type Loan = {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  dueDate: string;
  returned: boolean;
  createdAt: string;
  returnedAt?: string | null;
};

const store: { loans: Loan[] } = (globalThis as any);
if (!store.loans) {
  store.loans = [];
}

function findLoan(id: string) {
  return store.loans.find(l => l.id === id) || null;
}

// GET /api/loans/:id — detalle
export async function GET(_: Request, { params }: { params: { id: string }}) {
  const loan = findLoan(params.id);
  if (!loan) {
    return NextResponse.json({ error: 'Préstamo no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: loan }, { status: 200 });
}

// DELETE /api/loans/:id — eliminar
export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  const idx = store.loans.findIndex(l => l.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Préstamo no encontrado' }, { status: 404 });
  }
  const deleted = store.loans.splice(idx, 1)[0];
  return NextResponse.json({ ok: true, data: deleted }, { status: 200 });
}
