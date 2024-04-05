import express from "express";
import { googleController } from "../controllers/googleController.js";

const googleRouter = express.Router();

googleRouter.get("/google/getUrl", googleController.getAuthUrl);
googleRouter.get("/oauth2callback", googleController.getAccessToken);

export default googleRouter;
