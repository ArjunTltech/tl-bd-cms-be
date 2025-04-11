import { validFieldTypes } from "../constants/tooltipFieldTypes.js";

class TooltipService {
    #repositorys
    constructor(repositorys) {
        this.#repositorys = repositorys
    }

async upsertTooltipService(title, content, fieldType) {
try {
    if (!content || !fieldType) {
        return {success: false, status: 400, message: `Content and fieldType are required.` };
      }

      if (!validFieldTypes.includes(fieldType)) {
        return {success: false, status: 400, message: `Invalid fieldType. Valid types are: ${validFieldTypes.join(', ')}` };
      }
      const tooltip = await this.#repositorys.Upserttooltip(title, content, fieldType);
      if (!tooltip) {
        return { success: false,status: 400, message: `Failed to create Tooltip` };
    }
    return { success: true, status: 201, message: `Tooltip created successfully`, data: tooltip };
    
} catch (error) {
    console.error("Error in upsertTooltipService:", error.message || error);
    throw error;
}
}



async getTooltipByFieldTypeService(fieldType) {
    try {
        if (!fieldType) {
            return { success: false, status: 400, message: "Field type is required" };
        }
        const tooltip = await this.#repositorys.getTooltipByFieldType(fieldType)
        if (!tooltip) {
            return { success: false, status: 404, message: "No Tooltip found for the given field type" };
        }
        return { success: true, status: 200, message: "Tooltip fetched successfully", data: tooltip };
    } catch (error) {
        console.error("Error in getTooltipByFieldTypeService:", error.message || error);
        throw error;
    }

}



async getTooltipService() {
    try {
        const tooltip = await this.#repositorys.getTooltip()
        if (!tooltip) {
            return { success: false, status: 404, message: "No Tooltip found" };
        }
        return { success: true, status: 200, message: "Tooltip fetched successfully", data: tooltip };
    } catch (error) {
        console.error("Error in getTooltipService:", error.message || error);
        throw error;
    }
}














}
export default TooltipService