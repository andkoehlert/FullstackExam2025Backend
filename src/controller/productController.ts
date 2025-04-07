import {Request, Response} from 'express';
import { ProductModel } from '../models/productModel';
import {projectModel} from '../models/projectModel'
import {connect, disconnect} from '../repositroy/database'
import { error } from 'console';

// CRUD - create, read/get, upfate, delete


/**
 * Create a new product in the data source based on the request body.
 * @param req 
 * @param res 
 */

export async function createProduct(req: Request, res: Response): Promise<void> {
 
    const data = req.body;

    try {
      await connect();

      // This takes the req.body data and puts it into the ProductModal
      const product = new ProductModel(data)
      // This will get a new product document and use the save command on.
      // Save product based on productModel
      const result = await product.save();


      res.status(201).send(result);
    }

    catch (err) {
      res.status(500).send("Error creating product:" + err);
    }

    finally {
      await disconnect();
    }

}


/**
 * Create a new project in the data source based on the request body.
 * @param req 
 * @param res 
 */
export async function createProject(req: Request, res: Response): Promise<void> {
 
  const data = req.body;

  try {
    await connect();

    // This takes the req.body data and puts it into the projectModel
    const project = new projectModel(data)
    // This will get a new project document and use the save command on.
    // Save project based on productModel
    const result = await project.save();


    res.status(201).send(result);
  }

  catch (err) {
    res.status(500).send("Error creating project:" + err);
  }

  finally {
    await disconnect();
  }

}


/**
 * Gets all products from the data sources
 * @param req 
 * @param res 
 */

export async function getAllProducts(req: Request, res: Response): Promise<void> {
 
  // Dont need body because we not sending any data. This is a get request.
  try {
    await connect();
 
    // using the find() method 
    const result = await ProductModel.find({});

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
 * Gets a specefic product from the data sources
 * @param req 
 * @param res 
 */

export async function getProductById(req: Request, res: Response): Promise<void> {
 
  try {
    await connect();
 
    // object containing parameter values parsed from the URL path
    const id = req.params.id;
    // using the find() method 
    const result = await ProductModel.find({_id: id});

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

export async function updateProductById(req: Request, res: Response): Promise<void> {
 
// object containing parameter values parsed from the URL path
const id = req.params.id;  

try {
    await connect();
 
    
    // findByIdAndUpdate: find a document by its _id and update it with new data
    const result = await ProductModel.findByIdAndUpdate(id, req.body);

    if (!result) {
    res.status(404).send('Cant update prodcut with id=' + id);
    }

    else {
      res.status(200).send('Product updated succesfully updated.')
    }

  }

  catch (err) {
    res.status(500).send("Error updating product by id. Error:" + err);
  }
}



/**
 * Delete a specific product
 * @param req 
 * @param res 
 */

export async function deleteProductById(req: Request, res: Response): Promise<void> {
 
  // object containing parameter values parsed from the URL path
  const id = req.params.id;  
  
  try {
      await connect();
   
      
      // findByIdAndUpdate: find a document by its _id and deletes it
      const result = await ProductModel.findByIdAndDelete(id);
  
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