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

    async updateUser(req,res){
        try {
            const { id } = req.params; 
            const { name, email, role } = req.body;
                // Ensure all fields are provided
    if (!name || !email || !role) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    if (![UserType.ADMIN, UserType.SUPER_ADMIN].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    const user = await this.#UserService.findUserById(id)
    return res.status(user.status).json(user);
    
            const response = await this.#UserService.updateUserService(name, email, role)
        return res.status(response.status).json(response);

        } catch (error) {
            
        }
    }

    async getAllUsers(req,res){
        try {
            const response = await this.#UserService.getAllUserService() 
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error Fetching Users:",error.message || error)
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }



    
}

export default UserController