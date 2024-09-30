// src/dal/database.ts
import jsonfile from 'jsonfile';
import { Database, User, Book } from '../models/types';

const DB_FILE = 'database.json';

export const readDatabase = (): Database => {
  try {
    return jsonfile.readFileSync(DB_FILE);
  } catch (error) {
    return { users: [], userBooks: {} };
  }
};

export const writeDatabase = (data: Database): void => {
  jsonfile.writeFileSync(DB_FILE, data);
};

export const findUserByUsername = (username: string): User | undefined => {
  const db = readDatabase();
  return db.users.find(u => u.username === username);
};

export const addUser = (user: User): void => {
  const db = readDatabase();
  db.users.push(user);
  db.userBooks[user.userId] = [];
  writeDatabase(db);
};

export const getUserBooks = (userId: string): Book[] => {
  const db = readDatabase();
  return db.userBooks[userId] || [];
};

export const addBook = (userId: string, book: Book): void => {
  const db = readDatabase();
  if (!db.userBooks[userId]) {
    db.userBooks[userId] = [];
  }
  db.userBooks[userId].push(book);
  writeDatabase(db);
};

export const updateBook = (userId: string, bookId: string, updatedData: Partial<Book>): Book | null => {
  const db = readDatabase();
  const bookIndex = db.userBooks[userId]?.findIndex(book => book.bookId === bookId);
  if (bookIndex === -1 || bookIndex === undefined) return null;
  
  db.userBooks[userId][bookIndex] = { ...db.userBooks[userId][bookIndex], ...updatedData };
  writeDatabase(db);
  return db.userBooks[userId][bookIndex];
};

export const deleteBook = (userId: string, bookId: string): boolean => {
  const db = readDatabase();
  if (!db.userBooks[userId]) return false;
  
  const initialLength = db.userBooks[userId].length;
  db.userBooks[userId] = db.userBooks[userId].filter(book => book.bookId !== bookId);
  
  if (db.userBooks[userId].length === initialLength) return false;
  
  writeDatabase(db);
  return true;
};