
class ContactController {
    #contactService;

    constructor(contactService) {
        this.#contactService = contactService;
    }

    async contact(req, res) {
        try {
            const { name, email, phonenumber, country, business, products, services, message } = req.body;
            const response = await this.#contactService.contact({
                name,
                email,
                phonenumber,
                country,
                business,
                products,
                services,
                message,
            });

            return res.status(200).json({ success: true, data: response });
        } catch (error) {
            if (error.message.includes("required")) {
                return res.status(400).json({ success: false, message: error.message });
            }
            console.error("Error in ContactController:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

export default ContactController;
