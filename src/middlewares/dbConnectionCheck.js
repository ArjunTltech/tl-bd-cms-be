import prisma from "../helpers/prisma.js";

// Database Connection Check Middleware
const dbConnectionCheck = async (req, res, next) => {
    try {
      await prisma.$queryRaw`SELECT 1`; // Checking DB connection
      next(); // Proceed if successful
    } catch (error) {
      console.error("Database connection failed:", error.message);
      return res.status(503).json({
        success: false,
        message: "Service Unavailable. The database connection failed.",
      });
    }
  };
  
  export default dbConnectionCheck;