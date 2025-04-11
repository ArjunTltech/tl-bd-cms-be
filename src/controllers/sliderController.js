class SliderController {
    #sliderService
    constructor(sliderService){
        this.#sliderService =sliderService
    }
    
    async addSlider(req,res){
        try {            
            const {heading, subheading, tagline,description,category,order} =req.body
            const response = await this.#sliderService.createSlider(heading, subheading, tagline,description,req,category,order) 
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in SliderController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
    async editSlider(req,res){
        try {            
            const {heading, subheading, tagline,description,category,order} =req.body
           const sliderId = req.params.id            
           const response = await this.#sliderService.editSlider(heading, subheading, tagline,description,req,sliderId,category,order) 
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in SliderController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
  async  getSlider(req,res){
        try {            
            const response = await this.#sliderService.getSlider()
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in SliderController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
  async  deleteSlider(req,res){
        try {            
            const sliderId =req.params.id
            const response = await this.#sliderService.deleteSlider(sliderId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in SliderController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
    
}
export default SliderController