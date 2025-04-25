import mongoose, { Schema } from "mongoose";
import { Employee } from "../interfaces/employee";

const employeeSchema = new Schema<Employee>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String },
  profileImage: { type: String },
  bio: { type: String }
});

export const employeeModel = mongoose.model<Employee>("Employee", employeeSchema);
