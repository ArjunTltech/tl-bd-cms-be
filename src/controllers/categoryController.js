class CategoryController {
    #categoryService
    constructor(categoryService) {
        this.#categoryService = categoryService
    }

    async createBusiness(req, res) {
        try {
            const { business } = req.body
            const response = await this.#categoryService.createBusiness(business)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async getBusiness(req, res) {
        try {
            const response = await this.#categoryService.getBusiness()
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }

    async createService(req, res) {
        try {
            const { service } = req.body
            const response = await this.#categoryService.createService(service)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async getServices(req, res) {
        try {
            const response = await this.#categoryService.getServices()
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async createProduct(req, res) {
        try {
            const { product } = req.body
            
            const response = await this.#categoryService.createProduct(product)
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async getProducts(req, res) {
        try {
            const response = await this.#categoryService.getProducts()            
            return res.status(response.status).json(response);

        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async  deleteBusiness(req,res){
        try {            
            const businessId =req.params.businessId            
            const response = await this.#categoryService.deleteBusiness(businessId)
           console.log(response);
           
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
    async  deleteProduct(req,res){
        try {            
            const productId =req.params.id
            const response = await this.#categoryService.deleteProduct(productId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
    async  deleteService(req,res){
        try {            
            const serviceId =req.params.id
            const response = await this.#categoryService.deleteService(serviceId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in CategoryController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
}

export default CategoryController