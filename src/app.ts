import cors from 'cors';
import { setupDocs } from '../util/documentation';
import express, {Application, Request, Response} from 'express'
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import {testConnection} from './repositroy/database'


DotenvFlow.config();


// create express application
const app: Application = express();

export function startServer() {
  
  app.use(cors({
    origin: ['http://localhost:3000', 'https://fullstackexam2025backend.onrender.com'],
    credentials: true,
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accepts'],
  }));
  
  // JSON body parser - so it can understand json.
  app.use(express.json());

  app.use('/api', routes)

  setupDocs(app);

  // test connection
  testConnection();
   
  // start server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
      console.log("Server is running on port: " + PORT);
    })
}


