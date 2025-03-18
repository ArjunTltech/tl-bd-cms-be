import prisma from "../helpers/prisma.js"

class Repositorys {

   
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















}

export default Repositorys;