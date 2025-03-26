class StatsService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }


    async getTotalCounts() {
        const [
            totalClients,
            activeClients,
            totalSliders,
            totalUser,
            unreadEnquiries,
            totalEnquiries,
            unreadNotifications,
            activeSocialLinks,
        ] = await Promise.all([
            this.#repositorys.getTotalClients(),
            this.#repositorys.getActiveClients(),
            this.#repositorys.getTotalSliders(),
            this.#repositorys.getTotalUsers(),
            this.#repositorys.getUnreadEnquiries(),
            this.#repositorys.getTotalEnquiries(),
            this.#repositorys.getUnreadNotifications(),
            this.#repositorys.getActiveSocialLinks(),
        ]);

        return {
            clients: {
                total: totalClients,
                active: activeClients
            },
            sliders: {
                total: totalSliders
            },
            users: {
                total: totalUser
            },
            enquiries: {
                total: totalEnquiries,
                unread: unreadEnquiries
            },
            notifications: {
                unread: unreadNotifications
            },
            social: {
                active: activeSocialLinks
            },
        };
    }

    async getEnquiryStats() {
        const groupedData = await this.#repositorys.getEnquiriesLast7Days();

        const chartData = [["Date", "Enquiries"]];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split("T")[0];
            chartData.push([formattedDate, groupedData[formattedDate] || 0]);
        }

        return chartData.reverse();
    }





}
export default StatsService