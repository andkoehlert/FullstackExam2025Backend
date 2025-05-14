import cors from 'cors';
import { setupDocs } from '../util/documentation';
import express, {Application, Request, Response} from 'express'
import routes from './routes';
import {testConnection} from './repositroy/database'




// create express application test
const app: Application = express();

export function startServer() {
  
  app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Added OPTIONS
  allowedHeaders: [
    'auth-token', 
    'Origin', 
    'X-Requested-With', 
    'Content-Type', 
    'Accept',
  ],
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


