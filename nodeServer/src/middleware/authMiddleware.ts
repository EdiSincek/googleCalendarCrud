import { Request, Response, NextFunction } from "express";
import { AuthorizationService } from "../services/authorizationService.js";

export const authMiddleware = (authService: AuthorizationService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
