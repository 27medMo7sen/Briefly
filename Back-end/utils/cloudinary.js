import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Cloudinary configuration is missing. Please check your .env file');
}

export const uploadToCloudinary = async (filePath, folder) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Starting Cloudinary upload...');
      
      // Get file size for progress calculation
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;
      let uploadedBytes = 0;
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: folder,
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload completed successfully!');
            console.log('Video URL:', result.secure_url);
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id
            });
          }
        }
      );

      // Create read stream and track progress
      const readStream = fs.createReadStream(filePath);
      
      readStream.on('data', (chunk) => {
        uploadedBytes += chunk.length;
        const progress = Math.round((uploadedBytes / fileSize) * 100);
        console.log(`Upload progress: ${progress}% (${Math.round(uploadedBytes / 1024 / 1024)}MB / ${Math.round(fileSize / 1024 / 1024)}MB)`);
      });

      readStream.on('error', (error) => {
        console.error('Error reading file:', error);
        reject(error);
      });

      // Pipe the read stream to the upload stream
      readStream.pipe(uploadStream);

    } catch (error) {
      console.error('Error in upload process:', error);
      reject(error);
    }
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}; 