class EnquiryController {
    #enquiryService
    constructor(enquiryService){
        this.#enquiryService =enquiryService
    }
    
    async addEnquiry(req, res) {
      try {
          const { name, email, phone, location, message, business, products, services } = req.body;  
          const response = await this.#enquiryService.addEnquiry({
              name,
              email,
              phoneNumber: phone,
              country: location,
              message,
              business,
              products,
              service:services
          });
  
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
    async exportEnquiries(req, res) {
        try {
          const { status, startDate, endDate, format: fileFormat } = req.query;      
          const response = await this.#enquiryService.filterEnquiry(
            status,
            startDate,
            endDate,
            fileFormat
          );
      
          if (response.status !== 200) {
            return res.status(response.status).json(response);
          }
      
          // Set headers and send file based on format
          if (response.format === 'excel') {
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=enquiries.xlsx'
            );
          } else if (response.format === 'pdf') {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=enquiries.pdf'
            );
          }
      
          res.send(response.file);
        } catch (error) {
          console.error('Error exporting enquiries:', error);
          res.status(500).json({ error: 'Failed to export enquiries' });
        }
      }
      
}
export default EnquiryController