class AuthController {
  #authService
  constructor(authService) {
    this.#authService = authService
  }
  async login(req, res) {
    try {
      const { email, password } = req.body
      const response = await this.#authService.login(email, password)
      return res.status(response.status).json(response)
    } catch (error) {
      console.error("Error in AuthController:", error.message || error);
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }
  async forgetPassword(req, res) {
    try {
      const { email } = req.body
      const response = await this.#authService.forgetPassword(email)
      return res.status(response.status).json(response)
    } catch (error) {
      console.error("Error in AuthController:", error.message || error);
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body      
      const response = await this.#authService.verifyOtp(email, otp)
      return res.status(response.status).json(response)
    } catch (error) {
      console.error("Error in AuthController:", error.message || error);
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
      });

    }
  }
  async resetPassword(req, res) {
    try {
      const { email, newPassword, confirmNewPassword } = req.body;
      const response = await this.#authService.resetPassword( email, newPassword, confirmNewPassword)
      return res.status(response.status).json(response)
    } catch (error) {
      console.error("Error in AuthController:", error.message || error);
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error.",
      });

    }
  }
}
export default AuthController