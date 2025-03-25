class SEOController {
    #seoService
    constructor(seoService) {
        this.#seoService = seoService
    }

    async upsertSEO(req, res) {
        try {
        const { pageTitle } = req.params;
        const {
            title,
            description,
            keywords,
            ogTitle,
            ogDescription,
            ogImage,
            ogType,
            twitterCard,
            twitterTitle,
            twitterDescription,
            twitterImage,
        } = req.body;

        const response = await this.#seoService.seoUpsert(
            pageTitle,title,
            description,
            keywords,
            ogTitle,
            ogDescription,
            ogImage,
            ogType,
            twitterCard,
            twitterTitle,
            twitterDescription,
            twitterImage) 
            return res.status(response.status).json(response);
        } catch (error) {
            console.error("Error in SEOController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    };
    async getSeo(req,res){
        try {
            const { pageTitle } = req.params;
            const response = await this.#seoService.getSeo(pageTitle)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in SEOController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });  
        }
    }
}
export default  SEOController