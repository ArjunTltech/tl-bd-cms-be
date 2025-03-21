import { imageUploadToCloudinary } from "../utils/cloudinary.js";

class OrganizationDetails {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createOrganizationDetails(email, companyName, phoneNumber,req) {
        try {
            if (!email || !req.file) {
                return { status: 400, message: "All fields Required" }
            }
            const orgationDetails = {
                email, companyName, logo, phoneNumber
            }
            const folderPath = 'bd/organization';
            const result = await imageUploadToCloudinary(req.file, folderPath);
      
    
            orgationDetails.logo = result.secure_url;
            const organization = await this.#reposistorys.createOrganizationDetails(orgationDetails)
            if (!organization) {
                return { success: false, status: 500, message: "Failed to save Organization" }
            }
            return { success: true, status: 201, message: "Organization created successfully" }

        } catch (error) {
            console.error("Error in OrganizationService:", error.message || error);
            throw error
        }
    }
    async organizationDetails() {
        try {
            const organization = await this.#reposistorys.getOrganizationDetails()

            if (organization) {
                return { status: 200, message: "Organization details sent", organization }
            } else {
                return { status: 500, message: "Failed to sent organization details" }
            }
        } catch (error) {
            console.error("Error in OrganizationService:", error.message || error);
            throw error
        }
    }
}

export default OrganizationDetails