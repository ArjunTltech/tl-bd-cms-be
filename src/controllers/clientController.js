class ClientController {
    #ClientService
    constructor(clientService) {
        this.#ClientService = clientService

    }

    async createClient(req, res) {
        try {
            const { name, website,description, order,isActive } = req.body;
            const logo = req.file;
            const response = await this.#ClientService.createClientService(name, website,logo, description, order,isActive,req)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in client creation:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }


async getAllClients(req,res){
    try {
        const response = await this.#ClientService.getAllClientService()
        return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error while fetching clients:", error.message || error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error.",
        });
    }
}


async updateClient(req,res){
try {
    const { id } = req.params;
    const { name, website, description, order, isActive } = req.body;
    const response = await this.#ClientService.updateClientService(id,name, website, description, order, isActive,req)
    return res.status(response.status).json(response);

} catch (error) {
    console.error("Error upading client:", error.message || error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
    });
}
}

async deleteClient(req,res){
    try {
    const { id } = req.params;
        const response = await this.#ClientService.deleteClientService(id)
        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error delete client:", error.message || error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error.",
        });
    }
}


}

export default ClientController