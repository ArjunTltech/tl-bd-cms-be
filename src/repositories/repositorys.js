import { Prisma } from "@prisma/client";

class Repositorys {
    
    async findUserByEmail(email) {
      console.log(email,"repoistory section reached");
      
      return await Prisma.User.findOne({ email });
    }
    async createUser(userData) {
      return await Prisma.user.create({
        data: userData,
      });
    }
  }
  
  export default  Repositorys;