import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

/**
 * Setup Swagger documentation
 * @param app 
 */
export function setupDocs(app: Application) {

    // swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Title',
            version: '1.0.0',
            description: 'Description',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Local development server',
            },
            {
              url: 'https://fullstackexam2025backend.onrender.com/api/',
              description: 'Local development server',
          }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        imageURL: { type: 'string' },
                        category: { type: 'string' },
                        quantity: { type: 'number' },
                        stock: { type: 'number' },
                        supplier: { type: 'string' },
                        orderDate: { type: 'string', format: 'date' },
                        arrivalDate: { type: 'string', format: 'date' },
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                      
                    },
                    
                },
                Project: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        lokation: { type: 'string' },
                        startDate: {  type: 'string', format: 'date' },
                        endDate:  { type: 'string', format: 'date' },
                        status: { type: 'string' },
                        contract: { type: 'string' },
                    },
                    
                },
                Employee: {
  type: 'object',
  required: ['name', 'position', 'description'],
  properties: {
    name: { type: 'string' },
    position: { type: 'string' },
    description: { type: 'string' },
    email: { type: 'string', format: 'email' },
    profileImage: { type: 'string', format: 'uri' },
    bio: { type: 'string' },
  },
},
Post: {
  type: 'object',
  required: ['title', 'content', 'authorId'],
  properties: {
    title: { type: 'string' },
    content: { type: 'string' }, // Or 'object' if you're using mixed content
    authorId: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
  },
},

            },
        }
    }

    // swagger options
    const options = {
        swaggerDefinition,
        // Path to the files containing OpenAPI definitions
        apis: ['**/*.ts']
    }

    // swagger spec
    const swaggerSpec = swaggerJSDoc(options);

    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); }