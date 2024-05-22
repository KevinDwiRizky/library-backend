import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/DBConnection.mjs';
import routerMember from './routes/MemberRoute.mjs';
import routerBook from './routes/BookRoute.mjs';
import routerBorrowing from './routes/BorrowingRoutes.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost";

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'Documentation for Library API By : Kevin Dwi Rizky',
      },
      components: {
        schemas: {
          Member: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'ID of the member',
              },
              code: {
                type: 'string',
                description: 'Member code',
              },
              name: {
                type: 'string',
                description: 'Member name',
              },
              penaltyEndDate: {
                type: 'string',
                format: 'date-time',
                description: 'Penalty end date',
              },
            },
            required: ['code', 'name'],
          },
          Book: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'ID of the book',
              },
              code: {
                type: 'string',
                description: 'Book code',
              },
              title: {
                type: 'string',
                description: 'Book title',
              },
              author: {
                type: 'string',
                description: 'Book author',
              },
              stock: {
                type: 'integer',
                description: 'Book stock',
              },
            },
            required: ['code', 'title', 'author', 'stock'],
          },
          BorrowedBook: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'ID of the borrowed book',
              },
              memberId: {
                type: 'string',
                description: 'ID of the member who borrowed the book',
              },
              bookId: {
                type: 'string',
                description: 'ID of the borrowed book',
              },
              finalReturnDate: {
                type: 'string',
                format: 'date-time',
                description: 'Final return date of the book',
              },
              returnDate: {
                type: 'string',
                format: 'date-time',
                description: 'Actual return date of the book',
              },
              returned: {
                type: 'boolean',
                description: 'Flag indicating whether the book has been returned',
              },
            },
            required: ['memberId', 'bookId', 'finalReturnDate', 'returnDate', 'returned'],
          }          
        },
      },
    },
    apis: ['./routes/*.mjs'], 
  };
  
const specs = swaggerJsdoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/member", routerMember);
app.use("/api/v1/book", routerBook);
app.use("/api/v1/borrowing", routerBorrowing);

app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
