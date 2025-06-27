import cloudinary from 'cloudinary';
import 'dotenv/config';

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Image upload function
const imageUploadToCloudinary = async (file, folderPath) => {
  try {
    if (!file) {
      throw new Error("No image file provided.");
    }

    // Convert the file buffer to base64
    const b64 = Buffer.from(file.buffer).toString("base64");
    const image = `data:${file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: folderPath,
      tags: "product",
      resource_type: "auto",
    });

    // Return the uploaded image's URL and details
    return result;
  } catch (error) {
    console.error('Error during image upload:', error);
    throw new Error('Something went wrong while uploading the image.');
  }
};

// Reusable function to delete image from Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
  try {
    // Delete image from Cloudinary using publicId
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Could not delete image from Cloudinary');
  }
};
// const uploadPDFToCloudinary = async (file, folderPath) => {
//   try {
//     if (!file || file.mimetype !== 'application/pdf') {
//       throw new Error("Invalid file. Only PDF files are allowed.");
//     }

//     // Clean filename - remove special characters
//     const cleanName = file.originalname.replace(/[^\w.-]/g, '_');

//     const uploadOptions = {
//       folder: folderPath,
//       resource_type: "auto", // Let Cloudinary detect the type
//       type: "upload",
//       public_id: `${Date.now()}_${cleanName.replace('.pdf', '')}`,
//       overwrite: true,
//       invalidate: true,
//       flags: "attachment", // Ensures download rather than display
//       format: 'pdf', // Force PDF format
//       timeout: 60000
//     };

//     const result = await cloudinary.v2.uploader.upload(
//       `data:application/pdf;base64,${file.buffer.toString('base64')}`,
//       uploadOptions
//     );

//     return {
//       ...result,
//       secure_url: result.secure_url
//     };
//   } catch (error) {
//     console.error("Upload Error:", error);
//     throw new Error(`PDF upload failed: ${error.message}`);
//   }
// };
const uploadPDFToCloudinary = async (file, folderPath) => {
  try {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new Error("Invalid file. Only PDF files are allowed.");
    }

    // Clean filename and add timestamp for uniqueness
    const cleanName = file.originalname.replace(/[^\w.-]/g, '_');
    const publicId = `${folderPath}/${Date.now()}_${cleanName.replace('.pdf', '')}`;

    // Convert buffer to base64
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Upload with explicit v2 API and proper folder settings
    const uploadResult = await cloudinary.v2.uploader.upload(fileStr, {
      folder: folderPath,
      public_id: publicId,
      resource_type: 'auto',
      overwrite: true,
      invalidate: true,
      format: 'pdf',
      use_filename: false, // Important: We're using our own public_id
      unique_filename: false,
      type: 'upload' // Explicit upload type
    });

    console.log("Cloudinary Upload Result:", {
      public_id: uploadResult.public_id,
      folder: uploadResult.folder,
      url: uploadResult.secure_url
    });

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`PDF upload failed: ${error.message}`);
  }
};
/**
 * Delete a PDF from Cloudinary using its publicId
 * @param {string} publicId - The Cloudinary public ID (e.g., "bd/brochure/filename")
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
const deletePDFFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      return { result: 'skipped' };
    }    
    // First try deleting as image (based on your upload logs)
    let result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',  // Changed from 'raw' to 'image'
      type: 'upload',
      invalidate: true
    });


    // If not found as image, try as raw
    if (result.result === 'not found') {
      console.log("Trying as raw resource type");
      result = await cloudinary.v2.uploader.destroy(publicId, {
        resource_type: 'raw',
        type: 'upload',
        invalidate: true
      });
    }

    
    if (result.result !== 'ok') {
      throw new Error(`Deletion failed: ${result.result}`);
    }

    return result;
  } catch (error) {
    console.error("PDF Deletion Error:", {
      message: error.message,
      publicId,
      stack: error.stack
    });
    throw new Error(`Failed to delete PDF from Cloudinary: ${error.message}`);
  }
};
export { imageUploadToCloudinary, deleteImageFromCloudinary, deletePDFFromCloudinary, uploadPDFToCloudinary };  // Export both functions

