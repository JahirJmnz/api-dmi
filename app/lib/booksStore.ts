import { randomUUID } from 'crypto';

export type Book = {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  disponible: boolean;
  createdAt: string;
  updatedAt: string;
};

const books: Book[] = [];

function validate(payload: any, forUpdate = false) {
  const req = ['titulo', 'autor', 'isbn'];
  if (!forUpdate) {
    for (const f of req) {
      if (!payload?.[f] || typeof payload[f] !== 'string' || !payload[f].trim()) {
        throw new Error(`Campo inválido o faltante: "${f}"`);
      }
    }
  }
  if (payload?.disponible != null && typeof payload.disponible !== 'boolean') {
    throw new Error('El campo "disponible" debe ser booleano');
  }
}

export const bookStore = {
  list: () => books,
  get: (id: string) => books.find(b => b.id === id),
  create: (data: { titulo: string; autor: string; isbn: string; disponible?: boolean }) => {
    validate(data);
    const dup = books.some(b => b.isbn.toLowerCase() === data.isbn.toLowerCase());
    if (dup) throw new Error('ISBN ya registrado');
    const now = new Date().toISOString();
    const newBook: Book = {
      id: randomUUID(),
      titulo: data.titulo.trim(),
      autor: data.autor.trim(),
      isbn: data.isbn.trim(),
      disponible: data.disponible ?? true,
      createdAt: now,
      updatedAt: now,
    };
    books.push(newBook);
    return newBook;
  },
  update: (id: string, data: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const i = books.findIndex(b => b.id === id);
    if (i === -1) return null;
    validate(data, true);
    if (data.isbn && data.isbn.trim().toLowerCase() !== books[i].isbn.toLowerCase()) {
      const dup = books.some(b => b.isbn.toLowerCase() === data.isbn!.trim().toLowerCase());
      if (dup) throw new Error('ISBN ya registrado');
    }
    books[i] = {
      ...books[i],
      ...(data.titulo != null ? { titulo: String(data.titulo).trim() } : {}),
      ...(data.autor != null ? { autor: String(data.autor).trim() } : {}),
      ...(data.isbn != null ? { isbn: String(data.isbn).trim() } : {}),
      ...(data.disponible != null ? { disponible: Boolean(data.disponible) } : {}),
      updatedAt: new Date().toISOString(),
    };
    return books[i];
  },
  remove: (id: string) => {
    const i = books.findIndex(b => b.id === id);
    if (i === -1) return false;
    books.splice(i, 1);
    return true;
  },
};
