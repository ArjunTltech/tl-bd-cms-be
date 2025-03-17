import prisma from "../helpers/prisma.js"

class Repositorys {

    async findUserByEmail(email) {
      console.log(email,"repoistory section reached");
      
      return await prisma.findOne({ email });
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
   });
  }





  }
  
  export default  Repositorys;