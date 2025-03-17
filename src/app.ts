import express, {Application, Request, Response} from 'express'
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import {testConnection} from './repositroy/database'


DotenvFlow.config();


// create express application
const app: Application = express();


const PORT: number = parseInt(process.env.PORT as string) || 4000;
app.use('/api', routes)

export function startServer() {

testConnection();
   
    app.listen(PORT, function() {
      console.log("Server is running on port: " + PORT);
    })
}


