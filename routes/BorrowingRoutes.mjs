import express from 'express';
import BorrowedBooks from '../model/BorrowedBook.mjs';
import Member from '../model/Member.mjs';
import Book from '../model/Book.mjs';
import { borrowBook, getAllBorrowedBooks, getBorrowedBookById, returnBorrowedBook, searchBorrowedBooks } from '../controller/BorrowingController.mjs';

const routerBorrowing = express.Router();
/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: API for managing borrowed books
 */

/**
 * @swagger
 * /api/v1/borrowing:
 *   get:
 *     summary: Retrieve all borrowed books
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: A list of borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowedBook'
 *       500:
 *         description: Internal server error
 */
routerBorrowing.get('/', getAllBorrowedBooks);

/**
 * @swagger
 * /api/v1/borrowing/search:
 *   get:
 *     summary: Search for borrowed books by member ID or book ID
 *     tags: [Borrowing]
 *     parameters:
 *       - in: query
 *         schema:
 *           type: string
 *         description: Member ID
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: A list of borrowed books matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowedBook'
 *       400:
 *         description: Bad request
 */
routerBorrowing.get('/search', searchBorrowedBooks);

/**
 * @swagger
 * /api/v1/borrowing/{id}:
 *   get:
 *     summary: Get a borrowed book by ID
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the borrowed book
 *     responses:
 *       200:
 *         description: The borrowed book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 *       404:
 *         description: Borrowed book not found
 *       400:
 *         description: Bad request
 */
routerBorrowing.get('/:id', getBorrowedBookById);

/**
 * @swagger
 * /api/v1/borrowing:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: ID of the member borrowing the book
 *               bookId:
 *                 type: string
 *                 description: ID of the book being borrowed
 *             required:
 *               - memberId
 *               - bookId
 *     responses:
 *       201:
 *         description: The borrowed book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 *       400:
 *         description: Bad request
 */
routerBorrowing.post('/', borrowBook);

/**
 * @swagger
 * /api/v1/borrowing/return/{id}:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the borrowed book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Return date of the book
 *             required:
 *               - returnDate
 *     responses:
 *       200:
 *         description: Information about the returned book and any penalty applied to the member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borrowing:
 *                   $ref: '#/components/schemas/BorrowedBook'
 *                 updatedMember:
 *                   $ref: '#/components/schemas/Member'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Borrowed book not found
 */
routerBorrowing.put('/return/:id', returnBorrowedBook);

export default routerBorrowing;
