class SocialController {
    #SocialService
    constructor(socialService) {
        this.#SocialService = socialService
    }

    async createSocial(req, res) {
        try {
            const { platform, url, isActive } = req.body;
            const response = await this.#SocialService.createSocialService(platform, url, isActive)
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error in social media creation:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async getAllSocials(req, res) {
        try {
            const response = await this.#SocialService.getAllSocialService()
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error Fetching Socials:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }


    async getAllWebSocials(req, res) {
        try {
            const response = await this.#SocialService.getAllActiveSocialService()
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error Fetching Socials:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async updateSocial(req, res) {
        try {
            const { id } = req.params;
            const { platform, url, isActive } = req.body;
            const response = await this.#SocialService.updateSocialService(id,platform, url, isActive)
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error updating Socials:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async deleteSocial(req,res){
        try {
    const { id } = req.params;
    const response = await this.#SocialService.deleteSocialService(id)
    return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error deleting Socials:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async getSocialById(req,res){
        try {
    const { id } = req.params;
    const response = await this.#SocialService.getSocialByIDService(id)
    return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error fetch specific Social media:", error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
}

export default SocialController