import { v2 as cloudinary } from 'cloudinary';

// Load local .env files only if not in production
if (process.env.NODE_ENV !== 'production') {
  const DotenvFlow = require('dotenv-flow');
  DotenvFlow.config();
}

// Optional: Debug log to confirm Cloudinary is configured correctly
console.log('Cloudinary config:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? '***exists***' : 'MISSING'
});

// If CLOUDINARY_URL is set (in .env or Render), Cloudinary will auto-configure
export { cloudinary };
