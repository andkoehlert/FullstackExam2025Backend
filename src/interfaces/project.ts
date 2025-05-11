
import { User } from './user';


export interface Project extends Document {
  name: string;
  description: string;
  lokation: string;
  startDate: Date;
  endDate: Date;
  price: number;
  totalPrice: number;
  status: string;
  contract: string;
  _createdBy: User['id'];

  products: {
    productId: string;     
    quantity: number; 
    price: number;     
  }[];

  employees: {
    employeeId: string;
  }[];
}