import { imageUploadToCloudinary } from "../utils/cloudinary.js";

class SliderService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createSlider(heading, subheading, tagline,content,req) {
        try {
            if (!heading|| !subheading ||!tagline||!content||!req.file) {
                return { status: 400, message: "All fields Required" }
            }
            const sliderDetails = {
                heading, subheading, tagline,content,image
            }
            const folderPath = 'bd/settings';
            const result = await imageUploadToCloudinary(req.file, folderPath);
      
    
            sliderDetails.logo = result.secure_url;
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
}

export default SliderService