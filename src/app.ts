import express, {Application, Request, Response} from 'express'
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import {testConnection} from './repositroy/database'


DotenvFlow.config();


// create express application
const app: Application = express();





export function startServer() {
  

  // JSON body parser - so it can understand json.
  app.use(express.json());

  app.use('/api', routes)


  // test connection
  testConnection();
   
  // start server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
      console.log("Server is running on port: " + PORT);
    })
}


