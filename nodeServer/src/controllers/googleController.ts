import { google } from "googleapis";
import { Request, Response } from "express";
import dotenv from "dotenv";
import CalendarService from "../services/calendarService.js";
dotenv.config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3001/google/oauth2callback"
);
const calendarService = new CalendarService(oauth2Client);
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export const googleController = {
  login: (req: Request, res: Response) => {
    try {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      res.redirect(authUrl);
    } catch (error) {
      res
        .sendStatus(500)
        .send({ error: "Error generating auth url", details: error });
    }
  },
  getAccessToken: async (req: Request, res: Response) => {
    const { code } = req.query;
    try {
      const response = await oauth2Client.getToken(code as string);
      const { tokens } = response;
      oauth2Client.setCredentials(tokens);
      return res.status(200).send({ message: "Access token set successfully" });
    } catch (error) {
      res
        .sendStatus(500)
        .send({ error: "Error fetching access token", details: error });
    }
  },
  getEvents: async (req: Request, res: Response) => {
    try {
      const events = await calendarService.getEvents();
      res.send(events);
    } catch (error) {
      res
        .sendStatus(500)
        .send({ error: "Error fetching events.", details: error });
    }
  },
};
