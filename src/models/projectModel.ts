import { Schema, model } from 'mongoose';
import { Project } from '../interfaces/project'


const projectSchema = new Schema<Project>({
  name: { type: String, required: true, min: 6, max: 255},
  description:{ type: String, required: true, min: 6, max: 255},
  lokation: { type: String, required: true, min: 6, max: 255},
  startDate: { type: Date, default: Date.now},
  endDate: { type: Date, default: Date.now},
  price: { type: Number, required: true, min: 0 },  
  totalPrice: { type: Number, default: 0 },  
  status: {
    type: String,
    enum: ["not-started", "in-progress", "completed", "delayed"],
    default: "not-started"
  },
  contract: {type: String, required: false},
  _createdBy: { type: String, ref: 'User', required: true},
  
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
      quantity: { type: Number, required: true },
    },
  ],

  employees: [
    {
      employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }


    }
  ]

});

// Defining new model based on the project interface and in the database the collection will be called 'Project'
export const projectModel = model<Project>('Project', projectSchema)