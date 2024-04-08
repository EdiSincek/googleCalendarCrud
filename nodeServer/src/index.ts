import express, { Express, Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import createGoogleRouter from "./routes/googleRoutes.js";
import CalendarService from "./services/calendarService.js";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT: number = 3001;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "http://localhost:3001/google/oauth2callback"
);
app.use(cors());
const calendarService = new CalendarService(oauth2Client);

const googleRouter = createGoogleRouter(oauth2Client, calendarService);
app.use("/google", googleRouter);

app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
