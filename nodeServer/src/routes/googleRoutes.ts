import express from "express";
import { googleController } from "../controllers/googleController.js";

const googleRouter = express.Router();

googleRouter.get("/login", googleController.login);
googleRouter.get("/oauth2callback", googleController.getAccessToken);

export default googleRouter;
