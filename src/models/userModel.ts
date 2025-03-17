import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user'

const userSchema = new Schema<User>({
  name: { type: String, required: true, min: 6, max: 255},
  email:{ type: String, required: true, min: 6, max: 255},
  password: { type: String, required: true, min: 6, max: 255},
  registerDate: { type: Date, default: Date.now},
  number: {type: Number, required: false, min: 8, max: 255},
  role: {type: String, required: false}

});


// Defining new model based on the User interface and in the database the collection will be called 'User'
export const userModel = model<User>('User', userSchema);