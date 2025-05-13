import { v2 as cloudinary } from 'cloudinary';

// Optional debug
console.log('Cloudinary config:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? '***exists***' : 'MISSING'
});

export { cloudinary };