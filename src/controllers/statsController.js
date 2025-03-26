class StatsController {
    #StatsService
    constructor(statsService) {
        this.#StatsService = statsService

    }

    async totalCounts(req, res) {
        try {
            const counts = await this.#StatsService.getTotalCounts();
            res.json({
                success: true,
                counts
            });
        } catch (error) {
            console.error("Error fetching counts:", error);
            res.status(500).json({
                success: false,
                error: "Failed to fetch counts"
            });
        }
    }

    async enquiryStats(req, res) {
        try {
            const chartData = await this.#StatsService.getEnquiryStats();
            res.json(chartData);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ 
                error: "Failed to fetch data" 
            });
        }
    }








}
export default StatsController