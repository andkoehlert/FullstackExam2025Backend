import { User } from './user';

export interface Product extends Document {
  name: string;
  description: string;
  imageURL: string;
  category: string;
  quantity: number;
  stock: number;
  supplier: string;
  orderDate?: String;
  arrivalDate?: String;
 price: number;  
 _createdBy: User['id'];
}