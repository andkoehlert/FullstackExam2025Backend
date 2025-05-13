// cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Debug output to verify Cloudinary is configured
console.log('Cloudinary config check:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? '***exists***' : 'MISSING',
  api_secret: cloudinary.config().api_secret ? '***exists***' : 'MISSING'
});

// Verify the URL was parsed correctly
if (!cloudinary.config().cloud_name) {
  console.error('Cloudinary not configured! Check CLOUDINARY_URL environment variable');
}

export { cloudinary };