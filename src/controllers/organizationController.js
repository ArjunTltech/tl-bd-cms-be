class OrganizationDetailsController {
    #organizationDetailsService
    constructor(organizationDetailsService){
        this.#organizationDetailsService =organizationDetailsService
    }
    
    async addOrganization(req,res){
        try {
           console.log(req.body);
           
            const {email, companyName, logo, phoneNumber} =req.body
            const response = await this.#organizationDetailsService.createOrganizationDetails(email, companyName, logo, phoneNumber,req) 
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in OrganizationController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
  async  organizationDetails(req,res){
        try {
            const response = await this.#organizationDetailsService.organizationDetails()
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in OrganizationController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
}
export default OrganizationDetailsController