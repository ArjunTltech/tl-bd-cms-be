

export const verifyRole = (requiredRole) => (req, res, next) => {
    try {
      if (req.user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: You are not authorized to access this route" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };