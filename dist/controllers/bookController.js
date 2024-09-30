"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBooks = void 0;
const bookService = __importStar(require("../services/bookService"));
const getBooks = (req, res) => {
    const { userId } = req.query;
    if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    const books = bookService.getUserBooks(userId);
    res.json(books);
};
exports.getBooks = getBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookName } = req.body;
        const newBook = yield bookService.addBook(userId, bookName);
        res.json({ bookId: newBook.bookId, book: newBook });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => {
    try {
        const { userId, updatedData } = req.body;
        const { bookId } = req.params;
        const updatedBook = bookService.updateBook(userId, bookId, updatedData);
        res.json(updatedBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateBook = updateBook;
const deleteBook = (req, res) => {
    try {
        const { userId } = req.body;
        const { bookId } = req.params;
        bookService.deleteBook(userId, bookId);
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteBook = deleteBook;
