class ChatbotService {
    #reposistorys
    constructor(reposistorys) {
        this.#reposistorys = reposistorys
    }
    async createChat(question, answer, order) {
        if (!question || !answer) {
            return { success: false, status: 400, message: "Please provide all required fields" };
        }
        console.log(order);

        const chatData = { question, answer, order };

        const chat = await this.#reposistorys.createChat(chatData);
        if (!chat) {
            return { success: false, status: 500, message: "Error creating question" };
        }

        return { success: true, status: 201, message: "Question created successfully", data: chat };
    }
    async getAllChats() {
        try {
            const chat = await this.#reposistorys.getAllChats()

            if (!chat) {
                return { status: 400, success: false, message: "Failed to load Chat" }
            }
            return { status: 200, success: true, message: "Chat sent ", chat }
        } catch (error) {
            console.error("Error in ChatService:", error.message || error);
            throw error
        }
    }
    async editQuestion(questionId, question, answer) {
        try {
            if (!question || !answer) {
                return { status: 400, message: "All fields Required" }
            }
            const questionDetails = {
                question, answer
            }


            const questiondata = await this.#reposistorys.editQuestion(questionId, questionDetails)
            if (!questiondata) {
                return { success: false, status: 500, message: "Failed to update Question and answer" }
            }
            return { success: true, status: 201, message: "Question and answer updated successfully" }

        } catch (error) {
            console.error("Error in ChatbotService:", error.message || error);
            throw error
        }
    }
    async changeChatorder(sourceIndex, destinationIndex) {
        try {
            const allChats = await this.#reposistorys.getAllChats();

            // Validate data exists
            if (!allChats || allChats.length === 0) {
                throw new Error("No chat questions found");
            }

            // Validate indexes
            if (sourceIndex < 0 || sourceIndex >= allChats.length ||
                destinationIndex < 0 || destinationIndex >= allChats.length) {
                throw new Error("Invalid source or destination index");
            }

            // Swap the items
            const updatedChats = [...allChats];
            [updatedChats[sourceIndex], updatedChats[destinationIndex]] =
                [updatedChats[destinationIndex], updatedChats[sourceIndex]];

            // Update orders
            updatedChats[sourceIndex].order = sourceIndex + 1;
            updatedChats[destinationIndex].order = destinationIndex + 1;

            // Prepare updates for only the changed items
            const updates = [
                { id: updatedChats[sourceIndex].id, order: updatedChats[sourceIndex].order },
                { id: updatedChats[destinationIndex].id, order: updatedChats[destinationIndex].order }
            ];

            const changeOrder = await this.#reposistorys.changeChatorder(updates);
            if (!changeOrder) {
                return { success: false, status: 500, message: "Failed to change order" };
            }

            return {
                success: true,
                status: 200,
                message: "Order updated successfully",
                data: updatedChats
            };

        } catch (error) {
            console.error("Error in ChatbotService:", error.message || error);
            throw error;
        }
    }

    async deleteChat(chatId) {
        try {
            const chat = await this.#reposistorys.deleteChat(chatId)

            if (chat) {
                return { status: 200, message: "Chat Deleted Successfully" }
            } else {
                return { status: 500, message: "Failed to delete chat" }
            }
        } catch (error) {
            console.error("Error in ChatService:", error.message || error);
            throw error
        }
    }




}

export default ChatbotService