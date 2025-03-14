import ContactRepository from "../repositories/contactRepository.js";

class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async contact(contactData) {
        try {
            const { name, email, phonenumber, country, business, products, services, message } = contactData;

            if (!name || !email || !phonenumber || !country || !business || !products || !services || !message) {
                throw new Error("All fields are required.");
            }

            const newContact = await this.contactRepository.createContact({
                name,
                email,
                phonenumber,
                country,
                business,
                products,
                services,
                message,
            });

            return newContact;
        } catch (error) {
            console.error("Error in ContactService:", error);
            throw new Error(error.message || "Failed to save contact data.");
        }
    }
}

export default ContactService;
