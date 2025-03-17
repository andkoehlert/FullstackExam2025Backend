import { User } from './user';

export interface Product extends Document {
  name: string;
  description: string;
  imageURL: string;
  category: string;
  quantity: number;
  stock: number;
  supplier: string;
  orderDate?: Date;
  arrivalDate?: Date;
  _createdBy: User['id'];
}