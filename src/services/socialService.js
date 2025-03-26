class SocialService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }

    async createSocialService(platform, url, isActive) {
        try {
            if (!url || !platform) {
                return { status: 400, message: "Platform and URL are required fields" };
            }
            const existingSocial = await this.#repositorys.findFirstSocial(platform);
            if (existingSocial) {
                return { status: 400, message: `A social media entry for ${platform} already exists.` };
            }
            const social = await this.#repositorys.createSocial(platform, url, isActive);
            if (!social) {
                return { status: 400, message: `Failed to create Social media entry` };
            }
            return { status: 201, message: `Social media entry created successfully`, data: social };
        } catch (error) {
            console.error("Error in CreateSocialService:", error.message || error);
            throw error;
        }
    }


    async getAllSocialService() {
        try {
            const socials = await this.#repositorys.getAllSocials()
            if (!socials || socials.length === 0) {
                return { status: 400, message: "Social Medias not found" };
            }

            const activeSocials = socials.filter(social => social.isActive).length;

            return { status: 200, message: `Social media fetched successfully`, data: socials, activeCount: activeSocials };
        } catch (error) {
            console.error("Error in getAllSocialService:", error.message || error);
            throw error
        }

    }

    async updateSocialService(id, platform, url, isActive) {
        try {
            if (!id || !platform || !url) {
                return { success: false, status: 400, message: "Please provide all the required fields" };

            }
            const existingSocial = await this.#repositorys.findSocialById(id)
            if (!existingSocial) {
                return { success: false, status: 400, message: "Social media entry not found" };
            }
            const social = await this.#repositorys.updateSocial(id, platform, url, isActive, existingSocial)
            if (!social) {
                return { success: false, status: 400, message: "Failed to update Social media" };
            }
            return { success: true, status: 201, message: "Social media updated Successfully", data: social };

        } catch (error) {
            console.error("Error in updateSocialService:", error.message || error);
            throw error
        }

    }

    async deleteSocialService(id) {
        try {
            if (!id) {
                return { success: false, status: 400, message: "Failed to get social Id" }
            }
            const existingSocial = await this.#repositorys.findSocialById(id)
            if (!existingSocial) {
                return { success: false, status: 400, message: "Social media entry not found" };
            }
            const social = await this.#repositorys.deleteSocial(id)
            if (!social) {
                return { success: false, status: 400, message: "Failed to delete Social media" };
            }
            return { success: true, status: 200, message: "Social media deleted Successfully" };
        } catch (error) {
            console.error("Error in deleteSocialService:", error.message || error);
            throw error
        }

    }


    async getSocialByIDService(id) {
        try {
            if (!id) {
                return { success: false, status: 400, message: "Failed to get social Id" }
            }
            const social = await this.#repositorys.findSocialById(id)
            if (!social) {
                return { success: false, status: 400, message: "Social media entry not found" };
            }
            return { success: true, status: 200, message: "Social media entry fetched successfully", data: social };
        } catch (error) {
            console.error("Error in getSocialByIdService:", error.message || error);
            throw error
        }
    }

}
export default SocialService