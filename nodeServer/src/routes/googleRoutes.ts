import express from "express";
import createGoogleOAuthController from "../controllers/googleOauthController.js";
import createCalendarController from "../controllers/calendarController.js";
import { OAuth2Client } from "google-auth-library";
import CalendarService from "../services/calendarService.js";

export default function createGoogleRouter(
  oauth2Client: OAuth2Client,
  calendarService: CalendarService
) {
  const googleOAuthController = createGoogleOAuthController(oauth2Client);
  const calendarController = createCalendarController(calendarService);
  const router = express.Router();

  router.get("/login", googleOAuthController.login);
  router.get("/oauth2callback", googleOAuthController.getAccessToken);
  router.get("/calendar/getEvents", calendarController.getEvents);

  return router;
}
