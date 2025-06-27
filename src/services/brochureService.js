import { deletePDFFromCloudinary, uploadPDFToCloudinary } from "../utils/cloudinary.js";

class BrochureService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createBrochure(title, file) {
        try {
            let data;
            if (file) {
                const folderPath = 'bd/brochure';
                const result = await uploadPDFToCloudinary(file, folderPath);
                console.log(result, "S")
                data = {
                    title,
                    pdfFileUrl: result.secure_url,
                    pdfPublicId: result.public_id,
                    comingSoon: false
                };
            } else {
                data = { title, comingSoon: true }; // Mark as coming soon if no file
            }

            const createBrochure = await this.#reposistorys.createBrochure(data);
            if (createBrochure) {
                return { status: 200, message: "Brochure created successfully" };
            } else {
                return { status: 400, message: "Failed to create brochure" };
            }
        } catch (error) {
            console.error("Error in BrochureService:", error.message || error);
            throw error;
        }
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
    async editBrochure(brochureId, title, file) {
        try {
            const brochure = await this.#reposistorys.getBrochureById(brochureId);

            if (!brochure) {
                return { status: 404, message: "Brochure not found" };
            }

            let data = { title };

            if (file) {
                // Delete old PDF if it exists
                if (brochure.pdfFileUrl) {
                    await deletePDFFromCloudinary(brochure.pdfFileUrl);
                }

                // Upload new file
                const folderPath = 'bd/brochure';
                const result = await uploadPDFToCloudinary(file, folderPath);

                // Update data with new file URL
                data.pdfFileUrl = result.secure_url;
                data.pdfPublicId = result.public_id,

                    data.comingSoon = false;
            }

            const updatedBrochure = await this.#reposistorys.editBrochure(brochureId, data);

            if (updatedBrochure) {
                return { status: 200, message: "Brochure updated successfully" };
            } else {
                return { status: 400, message: "Brochure update failed" };
            }
        } catch (error) {
            console.error("Error in BrochureService:", error.message || error);
            throw error;
        }
    }

   async deleteBrochure(brochureId) {
  try {
    const brochure = await this.#reposistorys.getBrochureById(brochureId);
    if (!brochure) {
      return { status: 404, message: "Brochure not found" };
    }

    if (brochure.pdfPublicId) {
      await deletePDFFromCloudinary(brochure.pdfPublicId);
    }

    const deleteResult = await this.#reposistorys.deleteBrochure(brochureId);
    if (deleteResult) {
      return { status: 200, message: "Brochure deleted successfully" };
    }
    return { status: 400, message: "Failed to delete brochure" };
  } catch (error) {
    console.error("Error in BrochureService:", error);
    throw error;
  }
}



}

export default BrochureService