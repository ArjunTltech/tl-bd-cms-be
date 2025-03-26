import * as argon2 from "argon2";
import generateJwtToken from "../utils/gnerateJWTToken.js";
import { emailTemplates, sendEmail } from "../utils/emailService.js";

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
  async forgetPassword(email) {
    try {
      // let del =  await this.#repository.deleteOtp(email)
      if (!email) {
        throw { status: 400, message: "Email is required." };
      }
      const user = await this.#repository.findUserByEmail(email);
      if (!user) {
        return { status: 401, message: "User not found." };
      }
      let otp = Math.floor(100000 + Math.random() * 900000);

      const sentOtp = await sendEmail({
        to: email,
        subject: "Password Reset OTP",
        html: emailTemplates.sendOTP(user.name, otp)
      })      
      const saveOtp = await this.#repository.saveOtp(email, otp)
      if (!sentOtp || !saveOtp) {
        return { status: 400, message: "Failed to send OTP" };
      }
      return { status: 200, success: true, message: "OTP sent successfully" };

    } catch (error) {
      console.error("Error in AuthService:", error.message || error);
      throw error

    }
  }

  async verifyOtp(email, otp) {
    try {
      if (!email || !otp) {
        return { status: 400, message: "Please provide all the required fields" };
      }
      const existingOTP = await this.#repository.verifyOtp(email)
      if (!existingOTP) {
        return { status: 400, message: "No OTP found for this email", success: false };
      }
      if (existingOTP.isVerified === true) {
        return { status: 400, message: "OTP has expired", success: false }
      }
      if (existingOTP.expiresAt < new Date()) {
        return { status: 400, message: "OTP has expired", success: false }

      }
      if (existingOTP.otp !== otp) {
        return { status: 400, message: "Invalid OTP", success: false }
      }
      const update = await this.#repository.updateOtp(email)
      // let del =  await this.#repository.deleteOtp(email)

      return {
        status: 200,
        message: "OTP verified successfully, you can now reset your password",
        success: true,
      };
    } catch (error) {
      console.error("Error in AuthService:", error.message || error);
      throw error
    }
  }

  async resetPassword(email, newPassword, confirmNewPassword) {
    try {
      if (!email || !newPassword || !confirmNewPassword) {
        return {
          status: 400,
          message: "Please provide all the required fields",
          success: false,
        };
      }
      if (newPassword.length < 6) {
        return { status: 400, message:"Password must be at least 6 characters long", success: false };
      }
      if (newPassword !== confirmNewPassword) {
        return {
          status: 400,
          message: "New passwords do not match",
          success: false,
        };
      }
      const isOtpVerified = await this.#repository.verifyOtp(email)
      if (!isOtpVerified.isVerified) {
        return {
          status: 400,
          message: "Please verify your OTP first",
          success: false,
        };
      }
      const hashedPassword = await argon2.hash(newPassword);
      const user = await this.#repository.findUserByEmail(email)
      const updateUser = await this.#repository.updateUserPassword(email, hashedPassword)
      let del = await this.#repository.deleteOtp(email)
      
     await sendEmail({
        to: user.email,
        subject: "Password Reset Successful",
        html: emailTemplates.passwordResetSuccess(user.name)
    });
      return {
        status: 200,
        message: 'Password reset successfully',
        success: true,
      };
    } catch (error) {
      console.error("Error in AuthService:", error.message || error);
      throw error
    }
  }

}

export default AuthService