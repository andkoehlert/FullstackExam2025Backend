import {Request, Response} from 'express';
import { employeeModel } from '../models/employee';
import {connect, disconnect} from '../repositroy/database'

/**
 * Create a new employee in the data source based on the request body.
 * @param req 
 * @param res 
 */

export async function createEmployee(req: Request, res: Response): Promise<void> {

const data = req.body;

try {
  await connect()

  const employee = new employeeModel(data)

  const result = await employee.save()

  res.status(201).send(result) 

} catch (err) {
  res.status(500).send("Error creating employee:" + err);

} finally {
  await disconnect();
}

}


// fethc Employee

/**
 * Gets all employees from the data sources
 * @param req 
 * @param res 
 */


export async function getAllEmployees(req: Request, res: Response): Promise<void> {

  try {
    await connect();

    const result = await employeeModel.find({});
    
    res.status(201).send(result)

  } catch (err) {
    res.status(201).send("Error fetching data:" + err)
  }
  finally {
  await  disconnect();
  }
}