import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API Documentation for Library Management System',
    },
  },
  apis: ['../routes/*.mjs'],
};

const specs = swaggerJsdoc(options);

export default specs;