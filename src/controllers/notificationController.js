class NotificationController {
    #notificationService
    constructor(notificationService) {
        this.#notificationService = notificationService
    }

    async getAllNotifications(req,res) {
        try {
            
            const response = await this.#notificationService.getAllNotifications()            
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Notification Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async deleteNotification(req, res) {
        try {
            const notificationId = req.params.id            
            const response = await this.#notificationService.deleteNotification(notificationId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Notification Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async clearAllNotifications(req, res) {
        try {
            const response = await this.#notificationService.clearAllNotifications()
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Notification Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

}   

export default NotificationController