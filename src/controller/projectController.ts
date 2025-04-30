import {Request, Response} from 'express';
import { ProductModel } from '../models/productModel';
import {projectModel} from '../models/projectModel'
import {connect, disconnect} from '../repositroy/database'
import { error } from 'console';

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
 
  // destruct
  const { name, description, lokation, startDate, endDate, status, contract, products, _createdBy } = req.body;

  try {
    await connect();

    // check if all products exist in the database
    const productIds = products.map((product: {productId: string}) => product.productId);
    const existingProducts = await ProductModel.find({'_id': {$in: productIds}})

    // Check for invalid products (if quantity is 0 or less)
    const invalidProducts = products.some((p: any) => p.quantity <= 0);
    if (invalidProducts) {
    res.status(400).send("All quantities must be positive");
    return;
    }

    
    const uniqueIds = new Set(productIds);
    if (uniqueIds.size !== productIds.length) {
    res.status(400).send("Duplicate products not allowed");
    return;
    }

    
    if (existingProducts.length !== productIds.length) {
      res.status(400).send("some products do not exist.");
      return;
    }

        for (const item of products) {
          const product = existingProducts.find(p => p._id.equals(item.productId));
          if (!product || product.stock < item.quantity) {
            res.status(400).send(`Insufficient stock for ${product?.name}`);
            return;
          }
        }
     
       const bulkWriteResult = await ProductModel.bulkWrite(
          products.map((item: ProductItem) => ({
            updateOne: {
              filter: { 
              _id: item.productId, 
              stock: { $gte: item.quantity } 
            },
              update: { $inc: { stock: -item.quantity } }
            }
          }))
        );

        const updatedCount = bulkWriteResult.modifiedCount;
        if (updatedCount !== products.length) {
        res.status(400).send("One or more products have insufficient stock.");
        return;
        }



    const projectProducts = products.map((product: { productId: string, quantity: number }) => {
      return {
        productId: product.productId,
        quantity: product.quantity
      };
    });

    // create project
    const project = new projectModel({
      name,
      description,
      lokation,
      startDate,
      endDate,
      status,
      contract,
      _createdBy,
      products: projectProducts // adding products here
    });


  /*   // This takes the req.body data and puts it into the projectModel
    const project = new projectModel(data)
    // This will get a new project document and use the save command on.
 */
  // Save project based on productModel
  const result = await project.save();

  res.status(201).send(result);

  } catch (err) {
    res.status(500).send("Error creating project:" + err);
  } finally {
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