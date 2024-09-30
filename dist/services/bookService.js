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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getUserBooks = void 0;
// src/services/bookService.ts
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const database = __importStar(require("../dal/database"));
const getUserBooks = (userId) => {
    return database.getUserBooks(userId);
};
exports.getUserBooks = getUserBooks;
const addBook = (userId, bookName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}`);
        const bookData = response.data.docs[0];
        if (!bookData) {
            throw new Error('Book not found');
        }
        const newBook = {
            bookId: (0, uuid_1.v4)(),
            title: bookData.title,
            author: ((_a = bookData.author_name) === null || _a === void 0 ? void 0 : _a[0]) || 'Unknown',
            coverImage: bookData.cover_i ? `http://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg` : undefined
        };
        database.addBook(userId, newBook);
        return newBook;
    }
    catch (error) {
        throw new Error('Failed to fetch book data');
    }
});
exports.addBook = addBook;
const updateBook = (userId, bookId, updatedData) => {
    const updatedBook = database.updateBook(userId, bookId, updatedData);
    if (!updatedBook) {
        throw new Error('Book not found');
    }
    return updatedBook;
};
exports.updateBook = updateBook;
const deleteBook = (userId, bookId) => {
    const success = database.deleteBook(userId, bookId);
    if (!success) {
        throw new Error('Book not found');
    }
};
exports.deleteBook = deleteBook;
