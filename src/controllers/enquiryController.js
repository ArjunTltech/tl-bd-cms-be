class EnquiryController {
    #enquiryService
    constructor(enquiryService){
        this.#enquiryService =enquiryService
    }
    
    async addEnquiry(req,res){
        try {
            const {name,email,phoneNumber,country,message,business,products,service} =req.body
            const response = await this.#enquiryService.addEnquiry(name,email,phoneNumber,country,message,business,products,service) 
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in EnquiryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
  async  enquiresDetails(req,res){
        try {
            const response = await this.#enquiryService.enquiries()
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in EnquiryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
  async deleteEnquiry(req,res){
        try {
            const enquiryId =req.params.id
            const response = await this.#enquiryService.deleteEnquiry(enquiryId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in EnquiryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
}
export default EnquiryController