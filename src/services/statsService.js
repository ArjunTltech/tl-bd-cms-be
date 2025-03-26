class StatsService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }


    async getTotalCounts() {
        const [
            totalClients,
            activeClients,
            totalBlogs,
            totalServices,
            totalUser,
            totalFaq,
            totalTestimonials,
            totalCatalogues,
            activeCatalogues,
            unreadEnquiries,
            totalEnquiries,
            totalNewsletterSubscribers,
            unreadNotifications,
            activeSocialLinks,
            activeTeamMembers
        ] = await Promise.all([
            this.#repositorys.getTotalClients(),
            this.#repositorys.getActiveClients(),
            this.#repositorys.getTotalBlogs(),
            this.#repositorys.getTotalServices(),
            this.#repositorys.getTotalUsers(),
            this.#repositorys.getTotalFaqs(),
            this.#repositorys.getTotalTestimonials(),
            this.#repositorys.getTotalCatalogues(),
            this.#repositorys.getActiveCatalogues(),
            this.#repositorys.getUnreadEnquiries(),
            this.#repositorys.getTotalEnquiries(),
            this.#repositorys.getTotalNewsletterSubscribers(),
            this.#repositorys.getUnreadNotifications(),
            this.#repositorys.getActiveSocialLinks(),
            this.#repositorys.getActiveTeamMembers()
        ]);

        return {
            clients: {
                total: totalClients,
                active: activeClients
            },
            blogs: {
                total: totalBlogs
            },
            services: {
                total: totalServices
            },
            users: {
                total: totalUser
            },
            faqs: {
                total: totalFaq
            },
            testimonials: {
                total: totalTestimonials
            },
            catalogues: {
                total: totalCatalogues,
                active: activeCatalogues
            },
            enquiries: {
                total: totalEnquiries,
                unread: unreadEnquiries
            },
            newsletter: {
                subscribers: totalNewsletterSubscribers
            },
            notifications: {
                unread: unreadNotifications
            },
            social: {
                active: activeSocialLinks
            },
            team: {
                active: activeTeamMembers
            }
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