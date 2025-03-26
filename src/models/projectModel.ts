import { Schema, model } from 'mongoose';
import { Project } from '../interfaces/project'



const projectSchema = new Schema<Project>({
  name: { type: String, required: true, min: 6, max: 255},
  description:{ type: String, required: true, min: 6, max: 255},
  lokation: { type: String, required: true, min: 6, max: 255},
  startDate: { type: Date, default: Date.now},
  endDate: { type: Date, default: Date.now},
  status: {type: String, required: false},
  contract: {type: String, required: false}

});

// Defining new model based on the project interface and in the database the collection will be called 'Project'
export const projectModel = model<Project>('Project', projectSchema)