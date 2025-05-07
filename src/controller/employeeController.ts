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





/**
 * Gets a specefic employee from the data sources
 * @param req 
 * @param res 
 */

export async function getEmployeeById(req: Request, res: Response): Promise<void> {
 
  try {
    await connect();
 
    // object containing parameter values parsed from the URL path
    const id = req.params.id;
    // using the find() method 
    const result = await employeeModel.find({_id: id});

    res.status(200).send(result);
  }

  catch (err) {
    res.status(500).send("Error fetching product:" + err);
  }
}



/**
 * Updates a specific product
 * @param req 
 * @param res 
 */

export async function updateEmployeeById(req: Request, res: Response): Promise<void> {
 
// object containing parameter values parsed from the URL path
const id = req.params.id;  

try {
    await connect();
 
    
    // findByIdAndUpdate: find a document by its _id and update it with new data
    const result = await employeeModel.findByIdAndUpdate(id, req.body);

    if (!result) {
    res.status(404).send('Cant update employee with id=' + id);
    }

    else {
      res.status(200).send('Product employee succesfully updated.')
    }

  }

  catch (err) {
    res.status(500).send("Error updating employee by id. Error:" + err);
  }
}


  
  


/**
 * Delete a specific employee
 * @param req 
 * @param res 
 */

export async function deleteEmployeeById(req: Request, res: Response): Promise<void> {
 
  // object containing parameter values parsed from the URL path
  const id = req.params.id;  
  
  try {
      await connect();
   
      
      // findByIdAndUpdate: find a document by its _id and deletes it
      const result = await employeeModel.findByIdAndDelete(id);
  
      if (!result) {
      res.status(404).send('Cant delete employee with id=' + id);
      }
  
      else {
        res.status(200).send('employee deleted succesfully.')
      }
  
    }
  
    catch (err) {
      res.status(500).send("Error employee product by id. Error:" + err);
    }
  }



 

