import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

export default router;