import { generatePdfReport } from "../utils/pdf.js"
import {format} from 'date-fns'
import ExcelJS from 'exceljs'
import { createNotification } from "../helpers/createNotification.js"
class EnquiresService{
    #reposistorys
    constructor(reposistorys){
        this.#reposistorys =reposistorys
    }
    async addEnquiry({name,email,phoneNumber,country,message,business,products,service}){
        try {          
            if(!name|| !email|| !phoneNumber ||!country ||!message||!business||!products ||!service){
                return {status:400,message:"All fields Required"}
            }
            const enquiresDetails ={name,email,phoneNumber,country,message,business,products,service}
            const enquiry = await this.#reposistorys.createEnquiry(enquiresDetails)
            const notificationMessage = `You have an enquiry from ${name}`;
            await createNotification({
              subject: 'New Contact Enquiry',
              message: notificationMessage
            });
            if(!enquiry){
            return { success: false, status: 500, message: "Error creating enquiry" };
            }
            return {success:true,status:201,message:"Enquiry created successfully"}
        } catch (error) {
            console.error("Error in EnquryService:", error.message || error);
            throw error
        }
    }
    async enquiries(){
        try {
          const enquries = await this.#reposistorys.getAllEnquiries()  
          
          if(enquries){
            return {status:200,message:"Enquiries Details sent",enquries}
          }else{
            return {status:500,message:"Failed to sent enquiries details"}
          }
        } catch (error) {
            console.error("Error in EnquryService:", error.message || error);
      throw error
        }
    }
    async deleteEnquiry(enquiryId){
        try {
          const enquries = await this.#reposistorys.deleteEnquiry(enquiryId)  
          
          if(enquries){
            return {status:200,message:"Enquiries Deleted Successfully"}
          }else{
            return {status:500,message:"Failed to delete enquirie"}
          }
        } catch (error) {
            console.error("Error in EnquryService:", error.message || error);
      throw error
        }
    }
    async filterEnquiry(status, startDate, endDate, fileFormat) {
      try {
        const filters = {};
    
        if (status) {
          filters.status = status;
        }
    
        if (startDate || endDate) {
          filters.createdAt = {};
          if (startDate) {
            filters.createdAt.gte = new Date(startDate);
          }
          if (endDate) {
            filters.createdAt.lte = new Date(endDate);
          }
        }
    
        const enquiries = await this.#reposistorys.filterEnquiry(filters);
    
        if (fileFormat === 'excel') {
          // Export as Excel
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Enquiries');
    
          worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Phone Number', key: 'phoneNumber', width: 15 },
            { header: 'Country', key: 'country', width: 20 },
            { header: 'Business', key: 'business', width: 20 },
            { header: 'Products', key: 'products', width: 20 },
            { header: 'Service', key: 'service', width: 20 },
            { header: 'Message', key: 'message', width: 40 },
            { header: 'Status', key: 'status', width: 10 },
            { header: 'Date', key: 'createdAt', width: 20 },
          ];
    
          enquiries.forEach((enquiry) => {
            worksheet.addRow({
              name: enquiry.name,
              email: enquiry.email,
              phoneNumber: enquiry.phoneNumber,
              country: enquiry.country,
              business: enquiry.business,
              products: enquiry.products,
              service: enquiry.service,
              message: enquiry.message,
              status: enquiry.status,
              createdAt: format(new Date(enquiry.createdAt), 'dd MMM yyyy'),
            });
          });
    
          const buffer = await workbook.xlsx.writeBuffer();
          return { status: 200, file: buffer, format: 'excel' };
        }
    
        if (fileFormat === 'pdf') {
          const pdfBuffer = await generatePdfReport(enquiries, startDate, endDate);
          return { status: 200, file: pdfBuffer, format: 'pdf' };
        }
    
        return { status: 400, message: 'Invalid format specified' };
      } catch (error) {
        console.error("Error in EnquiryService:", error.message || error);
        throw error;
      }
    }
    
}
export default EnquiresService