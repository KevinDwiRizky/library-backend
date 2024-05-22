import express from 'express';
import Book from '../model/Book.mjs';
import { addBook, deleteBook, getAllBooks, updateBook } from '../controller/BookControllers.mjs';

const routerBook = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API untuk mengelola buku
 */

/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     summary: Mendapatkan daftar semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: OK. Daftar semua buku.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
routerBook.get('/', getAllBooks);

/**
 * @swagger
 * /api/v1/book:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Kode buku
 *               title:
 *                 type: string
 *                 description: Judul buku
 *               author:
 *                 type: string
 *                 description: Penulis buku
 *               stock:
 *                 type: integer
 *                 description: Jumlah stok buku
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
routerBook.post('/', addBook);

/**
 * @swagger
 * /api/v1/book/{id}:
 *   put:
 *     summary: Memperbarui informasi buku
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang akan diperbarui
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Kode buku
 *               title:
 *                 type: string
 *                 description: Judul buku
 *               author:
 *                 type: string
 *                 description: Penulis buku
 *               stock:
 *                 type: integer
 *                 description: Jumlah stok buku
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *     responses:
 *       200:
 *         description: Informasi buku berhasil diperbarui.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
routerBook.put('/:id', updateBook);

/**
 * @swagger
 * /api/v1/book/{id}:
 *   delete:
 *     summary: Menghapus buku
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang akan dihapus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus.
 */
routerBook.delete('/:id', deleteBook);

export default routerBook;
