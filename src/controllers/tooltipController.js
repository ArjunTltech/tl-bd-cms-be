class TooltipController {
    #TooltipService
    constructor(tooltipService) {
        this.#TooltipService = tooltipService
    }

    

/**
 * Controller to create or update a tooltip.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */


async upsertTooltip(req, res) {
try {
    const { title, content, fieldType } = req.body;
    const response = await this.#TooltipService.upsertTooltipService(title, content, fieldType) 
    return res.status(response.status).json(response);
} catch (error) {
    console.error("Error in upsert Tooltip:", error.message || error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
}
}

/**
 * Controller to get a tooltip by field type.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */

async getTooltipByFieldType (req, res) {
try {
    const { fieldType } = req.params;
    const response = await this.#TooltipService.getTooltipByFieldTypeService(fieldType) 
    return res.status(response.status).json(response);
} catch (error) {
    console.error("Error in getTooltipByFieldType:", error.message || error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
}
}


async getTooltip (req, res) {
try {
    const response = await this.#TooltipService.getTooltipService() 
    return res.status(response.status).json(response);
} catch (error) {
    console.error("Error in getTooltip:", error.message || error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
}
}


}
export default TooltipController