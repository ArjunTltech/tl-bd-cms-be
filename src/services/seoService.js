class SeoService{
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async seoUpsert(pageTitle,title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage){
        try{
            const seoData ={title,
                description,
                keywords,
                ogTitle,
                ogDescription,
                ogImage,
                ogType,
                twitterCard,
                twitterTitle,
                twitterDescription,
                twitterImage}
            const seo = await this.#reposistorys.seoCreation(pageTitle,seoData)
            if(seo){
                return {status:200,message:"SEO updated successfully"}
            }else{
                return {status:400,message:"Failed to update"}
            }
        }catch(error){
            console.error("Error in SEOService:", error.message || error);
            throw error  
        }
    }
    async getSeo(pageTitle){
        try {
            const seoData = await this.#reposistorys.getSeo(pageTitle)
            if(seoData){
                return {status:200,message:"SEO sent ",seoData}
            }
            else{
                return {status:400,message:"Failed to sent SEO"}
            }
            
        } catch (error) {
            console.error("Error in SEOService:", error.message || error);
            throw error  
        }
    }
}

export default SeoService