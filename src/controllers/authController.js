class AuthController {
    #authService
    constructor(authService) {
        this.#authService = authService
    }
    async login(req, res) {
        try {            
            const { email, password } = req.body
            const response = await this.#authService.login(email, password)
            return res.status(200).json({ success: true,  message: "Login successful." })
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
            const { email } = req.body
            const response = await this.#authService.resetPassword(email)
            return res.status(200).json({ success: true,  message: "OTP has been sent successfully for password reset." })
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