"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getUserBooks = exports.addUser = exports.findUserByUsername = exports.writeDatabase = exports.readDatabase = void 0;
// src/dal/database.ts
const jsonfile_1 = __importDefault(require("jsonfile"));
const DB_FILE = 'database.json';
const readDatabase = () => {
    try {
        return jsonfile_1.default.readFileSync(DB_FILE);
    }
    catch (error) {
        return { users: [], userBooks: {} };
    }
};
exports.readDatabase = readDatabase;
const writeDatabase = (data) => {
    jsonfile_1.default.writeFileSync(DB_FILE, data);
};
exports.writeDatabase = writeDatabase;
const findUserByUsername = (username) => {
    const db = (0, exports.readDatabase)();
    return db.users.find(u => u.username === username);
};
exports.findUserByUsername = findUserByUsername;
const addUser = (user) => {
    const db = (0, exports.readDatabase)();
    db.users.push(user);
    db.userBooks[user.userId] = [];
    (0, exports.writeDatabase)(db);
};
exports.addUser = addUser;
const getUserBooks = (userId) => {
    const db = (0, exports.readDatabase)();
    return db.userBooks[userId] || [];
};
exports.getUserBooks = getUserBooks;
const addBook = (userId, book) => {
    const db = (0, exports.readDatabase)();
    if (!db.userBooks[userId]) {
        db.userBooks[userId] = [];
    }
    db.userBooks[userId].push(book);
    (0, exports.writeDatabase)(db);
};
exports.addBook = addBook;
const updateBook = (userId, bookId, updatedData) => {
    var _a;
    const db = (0, exports.readDatabase)();
    const bookIndex = (_a = db.userBooks[userId]) === null || _a === void 0 ? void 0 : _a.findIndex(book => book.bookId === bookId);
    if (bookIndex === -1 || bookIndex === undefined)
        return null;
    db.userBooks[userId][bookIndex] = Object.assign(Object.assign({}, db.userBooks[userId][bookIndex]), updatedData);
    (0, exports.writeDatabase)(db);
    return db.userBooks[userId][bookIndex];
};
exports.updateBook = updateBook;
const deleteBook = (userId, bookId) => {
    const db = (0, exports.readDatabase)();
    if (!db.userBooks[userId])
        return false;
    const initialLength = db.userBooks[userId].length;
    db.userBooks[userId] = db.userBooks[userId].filter(book => book.bookId !== bookId);
    if (db.userBooks[userId].length === initialLength)
        return false;
    (0, exports.writeDatabase)(db);
    return true;
};
exports.deleteBook = deleteBook;
