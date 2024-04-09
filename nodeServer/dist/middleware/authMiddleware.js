export const authMiddleware = (authService) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
      await authService.verifyToken(token);
      next();
    } catch (error) {
      return res.status(403).send({ error: "Invalid token" });
    }
  };
};
