import express, { Express, Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import createGoogleRouter from "./routes/googleRoutes.js";
import CalendarService from "./services/calendarService.js";
import cors from "cors";
import { AuthorizationService } from "./services/authorizationService.js";
import pkg from "pg";
import DatabaseService from "./services/databaseService.js";

dotenv.config();

const app: Express = express();
const PORT: number = 3001;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "http://localhost:3001/google/oauth2callback"
);
const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.use(cors());
app.use(express.json());
const calendarService = new CalendarService(oauth2Client);
const authService = new AuthorizationService(oauth2Client);
const databaseService = new DatabaseService(pool);

const googleRouter = createGoogleRouter(
  oauth2Client,
  calendarService,
  authService,
  databaseService
);
app.use("/google", googleRouter);

app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
