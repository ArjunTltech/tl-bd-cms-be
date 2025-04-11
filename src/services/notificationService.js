class NotificationService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }

    async getAllNotifications() {
        try {
            const notification = await this.#reposistorys.getAllNotifications()

            if (!notification) {
                return { status: 400, success: false, message: "Failed to load notification" }
            }
            return { status: 200, success: true, message: "Notification sent ", notification }
        } catch (error) {
            console.error("Error in NotificationService:", error.message || error);
            throw error
        }
    }

    async deleteNotification(notificationId) {
        try {
            const notification = await this.#reposistorys.deleteNotification(notificationId)
            if (notification) {
                return { status: 200, message: "Notification Deleted Successfully" }
            } else {
                return { status: 500, message: "Failed to delete notification" }
            }
        } catch (error) {
            console.error("Error in NotificationService:", error.message || error);
            throw error
        }
    }

    async clearAllNotifications() {
        try {
            const notification = await this.#reposistorys.clearAllNotifications()
            if (notification) {
                return { status: 200, message: "All notifications cleared successfully'" }
            } else {
                return { status: 500, message: "Failed to clear notifications" }
            }
        } catch (error) {
            console.error("Error in NotificationService:", error.message || error);
            throw error
        }
    }
    async markAsRead(notificationId) {
        try {
            let markAsReadNotification = await this.#reposistorys.markReadAsNotification(notificationId)
            if (markAsReadNotification) {
                return { status: 400, message: 'Failed Notification to marked as read', success: true }
            }
            return { status: 200, message: 'Notification marked as read', success: true }

        } catch (error) {
            console.error("Error in NotificationService:", error.message || error);
            throw error        }
    };
}

export default NotificationService