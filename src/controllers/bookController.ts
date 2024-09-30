
import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getBooks = (req: Request, res: Response) => {
  const { userId } = req.query;
  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }
  const books = bookService.getUserBooks(userId);
  res.json(books);
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { userId, bookName } = req.body;
    const newBook = await bookService.addBook(userId, bookName);
    res.json({ bookId: newBook.bookId, book: newBook });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBook = (req: Request, res: Response) => {
  try {
    const { userId, updatedData } = req.body;
    const { bookId } = req.params;
    const updatedBook = bookService.updateBook(userId, bookId, updatedData);
    res.json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBook = (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.params;
    bookService.deleteBook(userId, bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};