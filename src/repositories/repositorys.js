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

  async updateUser(){
    return  await prisma.user.update({
      where: {
          id
      },
      data: {
          name,
          email,
          role,
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  
 async findUserById(){
   return await prisma.user.findUnique({
     where: {
         id
     },
 });
 } 
//  Enquiry Section
 async createEnquiry(enquiryData) {
  
  return await prisma.enquiry.create({ data: enquiryData });
}

async getAllEnquiries() {
  return await prisma.enquiry.findMany();
}

//OrganizationDetails Section

async createOrganizationDetails(organizationData) {
  
  return await prisma.organizationDetails.create({ data: organizationData });
}

async getOrganizationDetails() {
  
  return await prisma.organizationDetails.findMany();
}

//Slider

async createSlider(sliderData){
  return await prisma.slider.create({ data: sliderData });

}
async getAllSlider(){
  return await prisma.slider.findMany();

}







}

export default Repositorys;