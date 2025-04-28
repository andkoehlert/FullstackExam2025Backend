// src/controllers/uploadImage.ts
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';
import DotenvFlow from 'dotenv-flow';

DotenvFlow.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImage(req: Request, res: Response,): Promise<any> {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // my frontend will send a file which multer will take and put it in req.file
  const file = req.file!; 
  
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult!);
      }
    );
    stream.end(file.buffer);
  });

    res.json({
      url:       result.secure_url,
      public_id: result.public_id,
    });
  } 
