import { deletePDFFromCloudinary, uploadPDFToCloudinary } from "../utils/cloudinary.js";

class BrochureService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createBrochure(title, file) {
        try {
            if (file) {
                const folderPath = 'bd/brochure';
                const result = await uploadPDFToCloudinary(file, folderPath);
                var data = { title, pdfFileUrl: result.secure_url, comingSoon: false }
            }
            else {
                data = { title }
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
            if (brochure.pdfFileUrl) {

                await deletePDFFromCloudinary(brochure.pdfFileUrl)
            }

            const brochures = await this.#reposistorys.deleteBrochure(brochureId)
            if (brochures) {
                return { status: 200, message: "Brochures deleted successfully" }

            } else {
                return { status: 400, message: "Failed to delete brochure" }

            }

        } catch (error) {
            console.error("Error in BrochureService:", error.message || error);
            throw error
        }
    }



}

export default BrochureService