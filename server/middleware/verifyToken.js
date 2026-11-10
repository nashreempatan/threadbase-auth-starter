import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  // Read token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Reject if token is missing
  if (!token) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  // Verify JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user information
    req.user = decoded;

    // Continue to route handler
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}