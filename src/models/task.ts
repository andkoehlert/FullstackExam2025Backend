import { Schema, model, Types } from 'mongoose';
import { Task } from '../interfaces/task';  // Assuming you have an interface Task defined

const taskSchema = new Schema<Task>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _createdBy: { 
    type: Types.ObjectId,  // Make sure this is ObjectId, not just String
    ref: 'User', 
    required: true 
  },
  projectId: { 
    type: Types.ObjectId,  // Ensure this is ObjectId too
    ref: 'Project' 
  },
  employees: [{
    employeeId: { 
      type: Types.ObjectId, 
      ref: 'Employee' 
    },
    _id: false, // if you don't need a unique _id for each employee entry
  }]
});

export const TaskModel = model<Task>('Task', taskSchema);
