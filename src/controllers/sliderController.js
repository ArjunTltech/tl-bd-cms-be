class SliderController {
    #sliderService
    constructor(sliderService){
        this.#sliderService =sliderService
    }
    
    async addSlider(req,res){
        try {
           console.log(req.body);
           
            const {heading, subheading, tagline,content} =req.body
            const response = await this.#sliderService.createSlider(heading, subheading, tagline,content,req) 
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
}
export default SliderController