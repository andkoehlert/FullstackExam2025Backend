import { Schema, model } from 'mongoose';
import { Product } from '../interfaces/product'

const productSchema = new Schema<Product>({
  name: { type: String, required: true, min: 6, max: 255},
  description: { type: String, required: true, min: 6, max: 255},
  imageURL: { type: String, required: true},
  category: { type: String, required: true},
  quantity: { type: Number, required: true},
  stock: { type: Number, required: true},
  supplier: { type: String, required: true},
  orderDate: { type: Date, required: true, default: 0 },
  arrivalDate: { type: Date, required: true, default: 0},
  _createdBy: { type: String, ref: 'User', required: true}
})


// Defining new model based on the product interface and in the database the collection will be called 'Product'
export const ProductModel = model<Product>('Product', productSchema);