class EnquiresService{
    #reposistorys
    constructor(reposistorys){
        this.#reposistorys =reposistorys
    }
    async addEnquiry(name,email,phoneNumber,country,message,business,products,service){
        try {
            if(!name|| !email|| !phoneNumber ||!country ||!message||!business||!products ||!service){
                return {status:400,message:"All fields Required"}
            }
            const enquiresDetails ={name,email,phoneNumber,country,message,business,products,service}
            const enquiry = await this.#reposistorys.createEnquiry(enquiresDetails)
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
}
export default EnquiresService