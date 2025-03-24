import { imageUploadToCloudinary } from "../utils/cloudinary.js";

class OrganizationDetails {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createOrganizationDetails(email, companyname, phone,req) {
        try {
            
            if (!email|| !companyname||!phone) {
                return { status: 400, message: "All fields Required" }
            }
            const orgationDetails = {
                email, companyName:companyname, phoneNumber:phone
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
    async editOrganization(email, companyname, phone,req,organizationId) {
        try {
            if (!email ||!companyname||!phone) {
                return { status: 400, message: "All fields Required" }
            }
            const organizationDetails = {
                email,companyName: companyname, phoneNumber:phone
            }
          
            if(req.file){
           
                const folderPath = 'bd/organization';
                const result = await imageUploadToCloudinary(req.file, folderPath);
                organizationDetails.logo = result.secure_url;

            }
            const organization = await this.#reposistorys.editOrganization(organizationId,organizationDetails)
            if (!organization) {
                return { success: false, status: 500, message: "Failed to update Organization" }
            }
            return { success: true, status: 201, message: "Organization updated successfully" }

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