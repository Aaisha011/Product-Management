const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt-secret"; // Replace with process.env.JWT_SECRET in production

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
