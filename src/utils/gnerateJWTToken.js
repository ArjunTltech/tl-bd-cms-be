import jwt from "jsonwebtoken";

const generateJwtToken = (user) => {

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload,"123456789", {
        expiresIn: "30d",
    });
}

export default generateJwtToken