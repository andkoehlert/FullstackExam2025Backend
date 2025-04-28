import { v2 as cloudinary } from 'cloudinary'
import DotenvFlow from 'dotenv-flow';

DotenvFlow.config();

cloudinary.config({
  cloud_name: 'dlgefhkgs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,


})


export { cloudinary };