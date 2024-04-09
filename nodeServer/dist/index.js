import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import createGoogleRouter from "./routes/googleRoutes.js";
import CalendarService from "./services/calendarService.js";
import cors from "cors";
import { AuthorizationService } from "./services/authorizationService.js";
dotenv.config();
const app = express();
const PORT = 3001;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3001/google/oauth2callback");
app.use(cors());
app.use(express.json());
const calendarService = new CalendarService(oauth2Client);
const authService = new AuthorizationService(oauth2Client);
const googleRouter = createGoogleRouter(oauth2Client, calendarService, authService);
app.use("/google", googleRouter);
app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
});
app.get("/", (req, res) => {
    res.send("Hello world!");
});
