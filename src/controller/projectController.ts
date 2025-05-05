import {Request, Response} from 'express';
import { ProductModel } from '../models/productModel';
import {projectModel} from '../models/projectModel'
import {connect, disconnect} from '../repositroy/database'
import { error } from 'console';
import { employeeModel } from '../models/employee'
// CRUD - create, read/get, upfate, delete



interface ProductItem {
  productId: string;
  quantity: number;
}


/**
 * Create a new project in the data source based on the request body.
 * @param req 
 * @param res 
 */
export async function createProject(req: Request, res: Response): Promise<void> {
      // Receiving the body
      const { name, description, lokation, startDate, 
        endDate, status, contract, products, employees, _createdBy } = req.body;
         
        try {
          await connect();

          const validationError = await validateAndReserveProducts(products);
          if (validationError) {
            res.status(400).send(validationError);
            return;
          }

          const employeeValidationError = await validateEmployees(employees);
          if (employeeValidationError) {
            res.status(400).send(employeeValidationError)
            return;
          }
          
          const project = new projectModel({
            name,
            description,
            lokation,
            startDate,
            endDate,
            status,
            contract,
            _createdBy,
            products: (products || []).map((p: ProductItem) => ({ 
              productId: p.productId, 
              quantity: p.quantity 
            })),          
            employees: (employees || []).map((e: {employeeId: string}) => ({
              employeeId: e.employeeId
            })) 
          
          })
    
      // Saving a project

      const result = await project.save();
      // Sending back a response

      res.status(201).send(result);
     } catch (err) {
      res.status(500).send("Something went wrong: " + err);
     } finally {
      await disconnect();
     }    
        }

        // Employees validation:
        async function validateEmployees(employees: { employeeId: string}[]): Promise<string | null> {
            
        // Get all employees
          const employeeIds = employees.map(e => e.employeeId);

        // check for duplicates
         if (new Set(employeeIds).size !== (employeeIds).length) {
          return "No duplicates allowed"
         }
        // Query to db to find employees by their ID's.
        const existingEmployees = await employeeModel.find({ _id: {$in: employeeIds}})
        // if something is missing return error
         if (existingEmployees.length !== employeeIds.length) {
          return "Some employees do not exist"
         }
        // if no error return null
         return null;

        }

  

        // Product validation
      async function validateAndReserveProducts(products: ProductItem[]): Promise<string | null> {
        // Get all products
        const productIds = products.map(p => p.productId);

        // if something(this) is true it fails.
        if (products.some(p => p.quantity <= 0))
        return "Cant be below 0";

      // If the product id is not equal to one it fails. checking for duplicates.
        if (new Set(productIds).size !== productIds.length)
        return "No duplicate products allowed"

        const existingProducts = await ProductModel.find({_id: {$in: productIds}});
        if (existingProducts.length !== productIds.length)
        return "Some products do not exits";

        for (const item of products) {
          const product = existingProducts.find(p => p._id.equals(item.productId));
          if (!product || product.stock < item.quantity) {
            return `Not enough stock for ${product?.name || 'product'}`;
          }
        }

        const bulkWriteResult = await ProductModel.bulkWrite(
          products.map(item => ({
            updateOne: {
              filter: {_id: item.productId, stock: {$gte: item.quantity}},
              update: {$inc: {stock: -item.quantity}}
            }
          }))
        );

        if (bulkWriteResult.modifiedCount !== products.length) {
          return "One or more products are out of stock"
        }
        return null;
      }

      // employees




/**
 * Gets all projects from the data sources
 * @param req 
 * @param res 
 */

export async function getAllProjects(req: Request, res: Response): Promise<void> {
 
  // Dont need body because we not sending any data. This is a get request.
  try {
    await connect();
 
    // using the find() method 
    const result = await projectModel.find({});

    res.status(200).send(result);
  }

  catch (err) {
    res.status(500).send("Error fetching product:" + err);
  }

  finally {
    await disconnect();
  }

}



/**
 * Get projects based on status
 * @param req
 * @param res
 */
export async function getStatusProject(req: Request, res: Response) {
  // using params to get status in the URL. projects/status/completed.  
  // Could also use req.query.status. projects?status=completed.

  const status = req.params.status;  


  try {
      await connect();
      const result = await projectModel.find({ status });      
      res.status(200).send(result);
  } catch {
      res.status(500).send("Error retrieving status");
  }
  finally {
      await disconnect();
  }
}



/**
 * Gets a specefic project from the data sources
 * @param req 
 * @param res 
 */

export async function getProjectById(req: Request, res: Response): Promise<void> {
 
  try {
    await connect();
 
    // object containing parameter values parsed from the URL path
    const id = req.params.id;
    // using the find() method 
    const result = await projectModel.find({_id: id});

    res.status(200).send(result);
  }

  catch (err) {
    res.status(500).send("Error fetching product:" + err);
  }
}





/**
 * Updates a specific project
 * @param req 
 * @param res 
 */

export async function updateProjectById(req: Request, res: Response): Promise<void> {
 
  // object containing parameter values parsed from the URL path
  const id = req.params.id;  
  const { name, description, lokation, startDate, endDate, status, contract, products } = req.body;

  
  try {
      await connect();
   
      if (products) {
        const productIds = products.map((product: {productId: string}) => product.productId);
        const existingProducts = await ProductModel.find({'_id': { $in: productIds }});

        if (existingProducts.length !== productIds.length) {
          res.status(400).send("Some products do not exist");
          return;
        }
      }

      const updatedProject = await projectModel.findByIdAndUpdate(id, {
        $set: {
          name,
          description,
          lokation,
          startDate,
          endDate,
          status,
          contract,
          products
        },
      }, {new: true}); // this will return the opdated object

      if (!updatedProject) {
        res.status(404).send("Project not found");
        return;
      }

      res.status(200).send(updatedProject);


      /* // findByIdAndUpdate: find a document by its _id and update it with new data
      const result = await projectModel.findByIdAndUpdate(id, req.body);
  
      if (!result) {
      res.status(404).send('Cant update project with id=' + id); */

      } catch (err) {
        res.status(500).send("Error updating project by id. Error:" + err)
      } finally {
        await disconnect();
      }
  
    }
  
   
  
  
  
  




  export async function deleteProjectById(req: Request, res: Response): Promise<void> {
 
    // object containing parameter values parsed from the URL path
    const id = req.params.id;  
    
    try {
        await connect();
     
        
        // findByIdAndUpdate: find a document by its _id and deletes it
        const result = await projectModel.findByIdAndDelete(id);
    
        if (!result) {
        res.status(404).send('Cant delete prodcut with id=' + id);
        }
    
        else {
          res.status(200).send('Product deleted succesfully.')
        }
    
      }
    
      catch (err) {
        res.status(500).send("Error updating product by id. Error:" + err);
      }
    }