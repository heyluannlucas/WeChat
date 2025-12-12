import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
  console.log("Verifying token:", req.headers.authorization);
  
  if (!token) return res.status(401).send("You are not authenticated!");
  
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
