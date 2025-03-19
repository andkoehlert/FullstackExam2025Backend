import {
  type Request,
  type Response, 
  type NextFunction
} from "express";


import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";


// projects imports 

import { userModel } from "../models/userModel";
import { User } from "../interfaces/user";
import { connect, disconnect } from '../repositroy/database'


/**
 * Register a new user  
 * @param req
 * @param Response
 * @returns
 */

export async function registerUser(req: Request, res: Response) {
  
  try {

    // validate the user and password
    const {error} = validateUserRegistrationInfo(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message});
      return;
    }

    // check if the email is already registered

    await connect();

    // Using mongoose findOne method to find the matching document in the database 
    const checkIfEmailExists = await userModel.findOne({ email: req.body.email});

if (checkIfEmailExists) {
  res.status(400).json({ error: "Email already exists"});
  return;
}

    // hash the password

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    // Saving as a whole document (json object) based on my userModel
    const userObject = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: passwordHashed
    })

    const savedUser = await userObject.save();
    res.status(200).json({error: null, data: savedUser._id});

    // create a user object and save in the DB

  }

catch (error) {
    res.status(500).send("Error registering user. Error " + error);
}

finally {
    await disconnect();
}

};


/**
 * validate user, email, password
 * Using joi to write less code and keep it simple
 * @param data 
 */

export function validateUserRegistrationInfo(data: User): ValidationResult {

  const schema = Joi.object({
      name: Joi.string().min(6).max(255).required(),
      email: Joi.string().email().max(255).required(),
      password: Joi.string().min(6).max(255).required(),
  })

return schema.validate(data);

}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function loginUser(req: Request, res: Response) {
  try {

    // validate user login info
    const {error } = validateUserLoginInfo(req.body);

    if (error) {
      res.status(400).json({error: error.details[0].message});
      return;
    }

    await connect();

    const user: User | null = await userModel.findOne({email: req.body.email});

    if (!user) {
      res.status(400).json({error: "Email or password is wrong"});
      return;
    }

    else {

      // Using bcrypt.compare to compare a plain text password with hashed password in the database.
      const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json ({error: "password or email is wrong."});
        return;
      }

      // jwt.sign creates a JWT token (json web token)
      const userId: string = user.id;
      const token: string = jwt.sign(
        {
          // payload
          name: user.name,
          email: user.email,
          id: userId
        },
        process.env.TOKEN_SECRET as string,
        {expiresIn: '2h'}
      );

        // attach token
        res.status(200).header("auth-token", token).json({error: null, data: {userId, token}})

    }
    // find the user in the repository

    // create auth token and send it back

  }

  catch (error) {
      res.status(500).send("error logging in user. Error: " + error);
  }


  finally {
      await disconnect();
  }
}





/**
 * validate user login info: email and password
 * @param data 
 * @returns 
 */

export function validateUserLoginInfo(data: User): ValidationResult {

  const schema = Joi.object({
      email: Joi.string().email().max(255).required(),
      password: Joi.string().min(6).max(255).required(),
  })

return schema.validate(data);

}