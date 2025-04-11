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
            const productId =req.params.productId
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
            const serviceId =req.params.serviceId
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
    async editProduct(req,res){
        try {            
            const {product} =req.body
           const productId = req.params.productId             
           const response = await this.#categoryService.editProduct(productId,product) 
          
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
    async editService(req, res) {
        try {            
            const { service } = req.body;
            const serviceId = req.params.serviceId;             
            const response = await this.#categoryService.editService(serviceId, service);
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in BusinessController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async editBusiness(req, res) {
        try {            
            const { business } = req.body;
            const businessId = req.params.businessId;             
            const response = await this.#categoryService.editBusiness(businessId, business);
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in BusinessController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    
    
}

export default CategoryController