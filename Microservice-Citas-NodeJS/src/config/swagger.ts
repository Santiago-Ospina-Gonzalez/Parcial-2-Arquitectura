import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Appointments API', version: '1.0.0', description: 'API de citas simuladas' },
    servers: [{ url: 'http://localhost:3003' }],
  },
  apis: ['./src/presentation/modules/**/*.routes.ts'],
});
