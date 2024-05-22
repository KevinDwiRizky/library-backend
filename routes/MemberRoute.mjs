import express from 'express';
import Member from '../model/Member.mjs';
import { createMember, deleteMember, getAllMembers, updateMember } from '../controller/MemberController.mjs';

const routerMember = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing members
 */

/**
 * @swagger
 * /api/v1/member:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       '200':
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */

routerMember.get('/', getAllMembers);

/**
 * @swagger
 * /api/v1/member:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: A new member created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       '400':
 *         description: Bad request
 */

routerMember.post('/', createMember);

/**
 * @swagger
 * /api/v1/member/{id}:
 *   put:
 *     summary: Update a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member to update
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
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       '400':
 *         description: Bad request
 */

routerMember.put('/:id', updateMember);

/**
 * @swagger
 * /api/v1/member/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the member to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Member deleted successfully
 *       '400':
 *         description: Bad request
 */

routerMember.delete('/:id', deleteMember);

export default routerMember;
