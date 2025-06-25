import { deletePDFFromCloudinary, imageUploadToCloudinary, uploadPDFToCloudinary } from "../utils/cloudinary.js";

class BrochureService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createBrochure(title, file) {
        try {
            if(file){const folderPath = 'bd/brochure';
            const result = await uploadPDFToCloudinary(file, folderPath);
            var data = { title, pdfFileUrl: result.secure_url,comingSoon:false }}
            else{
                data={title}
            }
            const createBrochure = await this.#reposistorys.createBrochure(data)
            if (createBrochure) {
                return { status: 200, message: "Brochure created successfully" }
            } else {
                return { status: 400, message: "Failed to create brochure" }
            }
        } catch (error) {
            console.error("Error in BrochureService:", error.message || error);
            throw error
        }
    }
async updateBrochure(id, title, file) {
  const brochure = await this.#reposistorys.getBrochureById(id);
  if (!brochure) return { status: 404, message: "Brochure not found" };

  let pdfFileUrl = brochure.pdfFileUrl;
  if (file) {
    if (pdfFileUrl) {
      await deletePDFFromCloudinary(pdfFileUrl);
    }
    const upload = await uploadPDFToCloudinary(file, 'bd/brochure');
    pdfFileUrl = upload.secure_url;
  }

  const updated = await this.#reposistorys.updateBrochure(id, {
    title,
    pdfFileUrl,
  });

  return updated
    ? { status: 200, message: "Brochure updated successfully" }
    : { status: 400, message: "Failed to update brochure" };
}


    async getAllBrochures() {
        try {
            const brochures = await this.#reposistorys.getAllBrochure()
            if (brochures) {
                return { status: 200, message: "Brochures sent successfully", brochures }

            } else {
                return { status: 400, message: "Failed to sent brochure", brochures }

            }

        } catch (error) {
            console.error("Error in BrochureService:", error.message || error);
            throw error
        }
    }
    async deleteBrochure(brochureId) {
  try {
    const brochure = await this.#reposistorys.getBrochureById(brochureId);

    if (!brochure) {
      return { status: 404, message: "Brochure not found" };
    }

    // Delete PDF from Cloudinary if it exists
    if (brochure.pdfFileUrl) {
      try {
        await deletePDFFromCloudinary(brochure.pdfFileUrl);
      } catch (cloudErr) {
        console.warn("Failed to delete PDF from Cloudinary:", cloudErr.message);
        // Optional: continue anyway even if cloud deletion fails
      }
    }

    const deleted = await this.#reposistorys.deleteBrochure(brochureId);
    if (deleted) {
      return { status: 200, message: "Brochure deleted successfully" };
    } else {
      return { status: 400, message: "Failed to delete brochure" };
    }

  } catch (error) {
    console.error("Error in BrochureService:", error.message || error);
    throw error;
  }
}



}

export default BrochureService