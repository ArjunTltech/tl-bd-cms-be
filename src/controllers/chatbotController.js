class ChatbotController {
    #chatbotService
    constructor(chatbotService) {
        this.#chatbotService = chatbotService
    }

    async createChat(req,res) {
        try {
            const {question,answer,order}=req.body
            console.log(req.body);
            
            const response = await this.#chatbotService.createChat(question,answer,order)            
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Chatbot Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
    async getAllchats(req,res) {
        try {            
            const response = await this.#chatbotService.getAllChats()            
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Chatbot Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
 async chatOrder(req,res){
        try {            
            const {sourceIndex, destinationIndex }=req.body
           const response = await this.#chatbotService.changeChatorder(sourceIndex, destinationIndex ) 
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in ChatbotController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
 async editQuestion(req,res){
        try {            
            const {question,answer} =req.body
           const questionId = req.params.id            
           const response = await this.#chatbotService.editQuestion(questionId,question,answer) 
          
            return res.status(response.status).json(response);
            
        } catch (error) {
            console.error("Error in ChatbotController:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
              success: false,
              message: error.message || "Internal server error.",
            });
        }
    }
    async deleteQuestion(req, res) {
        try {
            const chatId = req.params.id 
            console.log(req.params.id,"ererer");
                       
            const response = await this.#chatbotService.deleteChat(chatId)
            return res.status(response.status).json(response)
        } catch (error) {
            console.error("Error in Chatbot Controller:", error.message || error);
            const statusCode = error.status || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message || "Internal server error.",
            });
        }
    }
  
 

}   

export default ChatbotController