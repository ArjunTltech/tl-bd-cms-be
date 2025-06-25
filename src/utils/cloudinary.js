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
const uploadPDFToCloudinary = async (file, folderPath) => {
  try {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new Error("Invalid file. Only PDF files are allowed.");
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.v2.uploader.upload(dataURI, {
      folder: folderPath,
      resource_type: "raw", // explicitly for non-image files like PDFs
    });

    return result; // contains secure_url, public_id, etc.
  } catch (error) {
    console.error("PDF Upload Error:", error);
    throw new Error("Failed to upload PDF to Cloudinary");
  }
};

/**
 * Delete a PDF from Cloudinary using its publicId
 * @param {string} publicId - The Cloudinary public ID (e.g., "bd/brochure/filename")
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
const deletePDFFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    return result;
  } catch (error) {
    console.error("PDF Deletion Error:", error);
    throw new Error("Failed to delete PDF from Cloudinary");
  }
};
export { imageUploadToCloudinary, deleteImageFromCloudinary ,deletePDFFromCloudinary,uploadPDFToCloudinary};  // Export both functions

