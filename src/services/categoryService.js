class CategoryService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }
    async createBusiness(businessName) {
        try {
            
            if (!businessName) {
                return { status: 400, message: "All fields Required" }
            }
            const business = await this.#repositorys.createBusiness(businessName)
            if (!business) {
                return { success: false, status: 500, message: "Failed to save Business" }
            }
            return { success: true, status: 201, message: "Business saved successfully" }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw new Error(error.message || "Failed to save contact data.");
        }
    }
    async getBusiness() {
        try {
            const business = await this.#repositorys.getAllBusiness()

            if (business) {
                return { status: 200, message: "Business details sent", business }
            } else {
                return { status: 500, message: "Failed to sent business details" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw error
        }
    }
    async deleteBusiness(businessId) {
        try {
            const business = await this.#repositorys.deleteBusiness(businessId)

            if (business) {
                return { status: 200, message: "Business deleted successfully"}
            } else {
                return { status: 500, message: "Failed to delete business" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error.message || error);
            throw error
        }
    }
    async editBusiness(businessId,businessName) {
        try {
            if (!businessName) {
                return { status: 400, message: "All fields Required" }
            }
        
            const slider = await this.#repositorys.editBusiness(businessId,businessName)
            if (!slider) {
                return { success: false, status: 500, message: "Failed to update Business" }
            }
            return { success: true, status: 201, message: "Business updated successfully" }

        } catch (error) {
            console.error("Error in SliderService:", error.message || error);
            throw error
        }
    }


    async createService(serviceName) {
        try {
            if (!serviceName) {
                return { status: 400, message: "All fields Required" }
            }
            const business = await this.#repositorys.createService(serviceName)
            if (!business) {
                return { success: false, status: 500, message: "Failed to save service" }
            }
            return { success: true, status: 201, message: "Service saved successfully" }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw new Error(error.message || "Failed to save contact data.");
        }
    }

    async getServices() {
        try {
            const services = await this.#repositorys.getAllServices()

            if (services) {
                return { status: 200, message: "Services details sent", services }
            } else {
                return { status: 500, message: "Failed to sent services details" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw error
        }
    }
    async deleteService(serviceId) {
        try {
            const service = await this.#repositorys.deleteService(serviceId)

            if (service) {
                return { status: 200, message: "Service deleted successfully"}
            } else {
                return { status: 500, message: "Failed to delete service" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error.message || error);
            throw error
        }
    }

    async createProducts(productName) {
        try {
            if (!productName) {
                return { status: 400, message: "All fields Required" }
            }
            const product = await this.#repositorys.createProducts(productName)
            if (!product) {
                return { success: false, status: 500, message: "Failed to save Product" }
            }
            return { success: true, status: 201, message: "Product saved successfully" }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw new Error(error.message || "Failed to save contact data.");
        }
    }
    async getProducts() {
        try {
            const products = await this.#repositorys.getAllProducts()

            if (products) {
                return { status: 200, message: "Products details sent", products }
            } else {
                return { status: 500, message: "Failed to sent products details" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error);
            throw error
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await this.#repositorys.deleteProduct(productId)

            if (product) {
                return { status: 200, message: "Product deleted successfully"}
            } else {
                return { status: 500, message: "Failed to delete product" }
            }
        } catch (error) {
            console.error("Error in CategoryService:", error.message || error);
            throw error
        }
    }

}

export default CategoryService