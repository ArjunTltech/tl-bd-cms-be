class UserController{
#UserService
constructor(userService){
this.#UserService=userService
}
    async createUser(req,res){
        try {
    const { name, email, password, confirmPassword, role } = req.body;
        const response = await this.#UserService.createUserService(name, email, password, confirmPassword, role) 
        return res.status(response.status).json(response);
   
        } catch (error) {
            console.error("Error in user creation:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });

        }
    }

    
}

export default UserController