// src/services/bookService.ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../models/types';
import * as database from '../DAL/database';

export const getUserBooks = (userId: string): Book[] => {
  return database.getUserBooks(userId);
};

export const addBook = async (userId: string, bookName: string): Promise<Book> => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}`);
    const bookData = response.data.docs[0];
    
    if (!bookData) {
      throw new Error('Book not found');
    }

    const newBook: Book = {
      bookId: uuidv4(),
      title: bookData.title,
      author: bookData.author_name?.[0] || 'Unknown',
      coverImage: bookData.cover_i ? `http://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg` : undefined
    };

    database.addBook(userId, newBook);
    return newBook;
  } catch (error) {
    throw new Error('Failed to fetch book data');
  }
};

export const updateBook = (userId: string, bookId: string, updatedData: Partial<Book>): Book => {
  const updatedBook = database.updateBook(userId, bookId, updatedData);
  if (!updatedBook) {
    throw new Error('Book not found');
  }
  return updatedBook;
};

export const deleteBook = (userId: string, bookId: string): void => {
  const success = database.deleteBook(userId, bookId);
  if (!success) {
    throw new Error('Book not found');
  }
};