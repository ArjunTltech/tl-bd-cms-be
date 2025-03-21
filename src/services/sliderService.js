import { imageUploadToCloudinary } from "../utils/cloudinary.js";

class SliderService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createSlider(heading, subheading, tagline,description,req) {
        try {
            if (!heading ||!tagline||!description||!req.file) {
                return { status: 400, message: "All fields Required" }
            }
            const sliderDetails = {
                heading, subheading, tagline,description
            }
            const folderPath = 'bd/slider';
            const result = await imageUploadToCloudinary(req.file, folderPath);
      
    
            sliderDetails.image = result.secure_url;
            const slider = await this.#reposistorys.createSlider(sliderDetails)
            if (!slider) {
                return { success: false, status: 500, message: "Failed to save Slider" }
            }
            return { success: true, status: 201, message: "Slider created successfully" }

        } catch (error) {
            console.error("Error in SliderService:", error.message || error);
            throw error
        }
    }
    async editSlider(heading, subheading, tagline,description,req,image,id) {
        try {
            if (!heading ||!tagline||!description) {
                return { status: 400, message: "All fields Required" }
            }
            const sliderDetails = {
                heading, subheading, tagline,description
            }
          
            if(req.file){
           
                const folderPath = 'bd/settings';
                const result = await imageUploadToCloudinary(req.file, folderPath);
                sliderDetails.image = result.secure_url;

            }
            const slider = await this.#reposistorys.editSlider(id,sliderDetails)
            if (!slider) {
                return { success: false, status: 500, message: "Failed to update Slider" }
            }
            return { success: true, status: 201, message: "Slider updated successfully" }

        } catch (error) {
            console.error("Error in SliderService:", error.message || error);
            throw error
        }
    }
    async getSlider() {
        try {
            const slider = await this.#reposistorys.getAllSlider()

            if (slider) {
                return { status: 200, message: "Slider details sent", slider }
            } else {
                return { status: 500, message: "Failed to sent slider details" }
            }
        } catch (error) {
            console.error("Error in SliderService:", error.message || error);
            throw error
        }
    }
    async deleteSlider(sliderId) {
        try {
            const slider = await this.#reposistorys.deleteSlider(sliderId)

            if (slider) {
                return { status: 200, message: "Slider deleted successfully"}
            } else {
                return { status: 500, message: "Failed to delete Slider" }
            }
        } catch (error) {
            console.error("Error in SliderService:", error.message || error);
            throw error
        }
    }
}

export default SliderService