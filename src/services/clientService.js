import { deleteImageFromCloudinary, imageUploadToCloudinary } from "../utils/cloudinary.js";

class ClientService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }

    async createClientService(name, website,logo, description, order,isActive,req) {

        try {
            if (!name || !website) {
                return {success: false, status: 404, message: "name and website are required fields" };
            }
            if (!req.file) {
                return {success: false, status: 404, message: "Logo image is required" };
            }
            const clientDetails = {
                name, website, logo, description, order, isActive
            }

            const folderPath = 'bd/clients';
            const result = await imageUploadToCloudinary(req?.file, folderPath);
            
            clientDetails.logo = result.secure_url
            const client = await this.#repositorys.createClient(clientDetails)
            if (!client) {
                return { success: false, status: 500, message: "Failed to create client" }
            }
            return { success: true, status: 201, message: "client created successfully",data: client }
        } catch (error) {
            console.error("Error in createClientService:", error.message || error);
            throw error
        }
    }

async getAllClientService(){
    try {
        const client = await this.#repositorys.getAllClients()
        if (!client || client.length === 0) {
            return { success: false, status: 500, message: "Clients not Found" }
        }
        return { success: true, status: 200, message: "client fetched successfully",data: client }

    } catch (error) {
        console.error("Error in getAllClientService:", error);
        return { success: false, status: 500, message: "Internal server error. Please try again later." };
    }
}


async updateClientService(id,name, website, description, order, isActive,req){
    try {
        if (!name || !website) {
            return {success: false, status: 404, message: "name and website are required fields" };
        }
        const existingClient= await this.#repositorys.findClientById(id)
        if (!existingClient) {
            return {success: false, status: 404, message: "existing Client not found" };
        }
        let logoUrl = existingClient.logo;
        if (req.file) {
            // Delete the old logo from Cloudinary
            const publicId = existingClient.logo.split('/').slice(7, -1).join('/') + '/' + existingClient.logo.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);

            // Upload the new logo
            const folderPath = 'bd/clients';
            const result = await imageUploadToCloudinary(req.file, folderPath);
            logoUrl = result.secure_url;
        }
        const updateData = {
            name,
            logo: logoUrl,
            website,
            description,
            isActive: isActive === 'true',
            updatedAt: new Date()
        };
        if (order !== undefined) {
            updateData.order = parseInt(order, 10);
        }
        const client= await this.#repositorys.updateClient(id,updateData)
        if(!client){
            return { status: 404, message: "failed to update client" };
        }
        return { success: true, status: 201, message: "client updated successfully",data: client }

    } catch (error) {
        console.error("Error in updateClientService:", error);
        return { success: false, status: 500, message: "Internal server error. Please try again later." };
    }
}



async deleteClientService(id){
    try {
        if(!id){
            return { status: 404, message: "Failed to get Id" };
        }
        const existingClient= await this.#repositorys.findClientById(id)
        if (!existingClient) {
            return {success: false, status: 404, message: "existing Client not found" };
        }

        // Delete the logo from Cloudinary
        const publicId = existingClient.logo.split('/').slice(7, -1).join('/') + '/' + existingClient.logo.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(publicId);

        const Client= await this.#repositorys.deleteClient(id)
        if (!Client) {
            return { success: false, status: 404, message: "failed to delete Client" };
        }
        return { success: true,status: 200, message: "Client deleted successfully" };

    } catch (error) {
        console.error("Error in deleteClientService:", error);
        return { success: false, status: 500, message: "Internal server error. Please try again later." };
    }
}
}
export default ClientService