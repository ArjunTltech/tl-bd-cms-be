import prisma from "../helpers/prisma.js"

class Repositorys {

    async findUserByEmail(email) {      
      return await prisma.user.findUnique({
        where: { email }
      });
    }    

/**
 * User Repository - Handles CRUD operations for user management.
 */

    async createUser(userData) {
      return await prisma.user.create({
        data: userData,
      });
    }

    async userExists(email){
     return await prisma.user.findUnique({
      where: {
          email,
      },
   });}

   async createEnquiry(enquiryData) {
    console.log(enquiryData,"data");
    
    return await prisma.user.create({
      data: enquiryData,
    });
  }
   async getEnquires(){
    return await prisma.enquiry.findMany(); 
  }

  }
  
  export default  Repositorys;