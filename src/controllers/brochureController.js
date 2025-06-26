class BrochureController {
    #brochureService
    constructor(brochureService) {
        this.#brochureService = brochureService
    }

    async addBrochure(req, res) {
        try {
            const { title } = req.body
            const response = await this.#brochureService.createBrochure(title, req.file)

            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in BrochureController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async getAllBrochure(req, res) {
        try {
            const response = await this.#brochureService.getAllBrochures()
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in BrochureController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async deleteBrochure(req, res) {
        try {
            const brochureId = req.params.id
            const response = await this.#brochureService.deleteBrochure(brochureId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in BrochureController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async editBrochure(req, res) {
        try {
            const brochureId = req.params.id
            const { title } = req.body
            const response = await this.#brochureService.editBrochure(brochureId, title, req.file)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in BrochureController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

}
export default BrochureController