import {Request, Response} from 'express';
import { PostModel } from '../models/post';
import {connect, disconnect} from '../repositroy/database'



/**
 * Create a new post in the data source based on the request body.
 * @param req 
 * @param res 
 */

export async function createPost(req: Request, res: Response): Promise<void> {
 
    const data = req.body;

    try {
      await connect();

      // This takes the req.body data and puts it into the postmodel
      const post = new PostModel(data)
      // This will get a new post document and use the save command on.
      // Save post based on PostModel
      const result = await post.save();


      res.status(201).send(result);
    }

    catch (err) {
      res.status(500).send("Error creating post:" + err);
    }

    finally {
      await disconnect();
    }

}




/**
 * Gets all post from the data sources
 * @param req 
 * @param res 
 */

export async function getAllPosts(req: Request, res: Response): Promise<void> {
 
  // Dont need body because we not sending any data. This is a get request.
  try {
    await connect();
 
    // using the find() method 
    const result = await PostModel.find({});

    res.status(200).send(result);
  }

  catch (err) {
    res.status(500).send("Error fetching post:" + err);
  }

  finally {
    await disconnect();
  }

}



/**
 * Gets a specefic post from the data sources
 * @param req 
 * @param res 
 */

export async function getPostById(req: Request, res: Response): Promise<void> {
 
  try {
    await connect();
 
    // object containing parameter values parsed from the URL path
    const id = req.params.id;
    // using the find() method 
    const result = await PostModel.find({_id: id});

    res.status(200).send(result);
  }

  catch (err) {
    res.status(500).send("Error fetching post:" + err);
  }
}



/**
 * Updates a specific post
 * @param req 
 * @param res 
 */

export async function updatePostById(req: Request, res: Response): Promise<void> {
 
// object containing parameter values parsed from the URL path
const id = req.params.id;  

try {
    await connect();
 
    
    // findByIdAndUpdate: find a document by its _id and update it with new data
    const result = await PostModel.findByIdAndUpdate(id, req.body);

    if (!result) {
    res.status(404).send('Cant update post with id=' + id);
    }

    else {
      res.status(200).send('Post succesfully updated.')
    }

  }

  catch (err) {
    res.status(500).send("Error updating post by id. Error:" + err);
  }
}


  
  


/**
 * Delete a specific post
 * @param req 
 * @param res 
 */

export async function deletePostById(req: Request, res: Response): Promise<void> {
 
  // object containing parameter values parsed from the URL path
  const id = req.params.id;  
  
  try {
      await connect();
   
      
      // findByIdAndUpdate: find a document by its _id and deletes it
      const result = await PostModel.findByIdAndDelete(id);
  
      if (!result) {
      res.status(404).send('Cant delete post with id=' + id);
      }
  
      else {
        res.status(200).send('post deleted succesfully.')
      }
  
    }
  
    catch (err) {
      res.status(500).send("Error post product by id. Error:" + err);
    }
  }
