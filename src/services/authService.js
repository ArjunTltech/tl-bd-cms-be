class AuthService {
  #repository
  constructor(repository){
    this.#repository =repository
  }
    async login(email, password) {
        try {
          if (!email) {
            throw { status: 400, message: "Email is required." };
          }
    
          if (!password) {
            throw { status: 400, message: "Password is required." };
          }
    
        const user = await this.#repository.findUserByEmail(email);
       console.log(user,"service section");
       
        //   if (!user) {
        //     throw { status: 401, message: "Invalid email or password." };
        //   }
    
        //   const isMatch = await bcrypt.compare(password, user.password);
        //   if (!isMatch) {
        //     throw { status: 401, message: "Invalid email or password." };
        //   }
    
        //   const token = jwt.sign(
        //     { id: user._id, email: user.email },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "1h" }
        //   );
    
          return { token, user };
        } catch (error) {
          console.error("Error in AuthService:", error.message || error);
          throw error;
        }
      }
      async resetPassword(email){
        try {
            if(!email){
                  throw { status: 400, message: "Email is required." };
            }
          let otp = Math.floor(100000 + Math.random() * 900000);
          console.log(otp);
          
          return otp
        } catch (error) {
            console.error("Error in AuthService:",error.message|| error);
            throw error
            
        }
      }
    }

export default AuthService