import * as argon2 from "argon2";
import generateJwtToken from "../utils/gnerateJWTToken.js";

class AuthService {
  #repository
  constructor(repository) {
    this.#repository = repository
  }
  async login(email, password) {
    try {
      if (!email) {
        return { status: 400, message: "Email is required." };
      }

      if (!password) {
        return { status: 400, message: "Password is required." };
      }

      const user = await this.#repository.findUserByEmail(email);
      if (!user) {
        return { status: 401, message: "Invalid email or password." };
      }

      const isMatch = await argon2.verify(user.password, password);
      if (!isMatch) {
        return { status: 401, message: "Invalid email or password." };
      }
      const token = generateJwtToken(user)
      return { status: 201, message: "Login Successfull", token, user };
    } catch (error) {
      console.error("Error in AuthService:", error.message || error);
      throw error;
    }
  }
  async resetPassword(email) {
    try {
      if (!email) {
        throw { status: 400, message: "Email is required." };
      }
      const user = await this.#repository.findUserByEmail(email);
      if (!user) {
        return { status: 401, message: "User not found." };
      }
      let otp = Math.floor(100000 + Math.random() * 900000);
      console.log(otp);

      return otp
    } catch (error) {
      console.error("Error in AuthService:", error.message || error);
      throw error

    }
  }
}

export default AuthService