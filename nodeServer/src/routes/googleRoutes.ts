import express from "express";
import createGoogleOAuthController from "../controllers/googleOauthController.js";
import createCalendarController from "../controllers/calendarController.js";
import { OAuth2Client } from "google-auth-library";
import CalendarService from "../services/calendarService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AuthorizationService } from "../services/authorizationService.js";
import DatabaseService from "../services/databaseService.js";

export default function createGoogleRouter(
  oauth2Client: OAuth2Client,
  calendarService: CalendarService,
  authService: AuthorizationService,
  databaseService: DatabaseService
) {
  const googleOAuthController = createGoogleOAuthController(oauth2Client);
  const calendarController = createCalendarController(
    calendarService,
    databaseService
  );
  const verifyAuth = authMiddleware(authService);
  const router = express.Router();

  router.get("/login", googleOAuthController.login);
  router.get("/oauth2callback", googleOAuthController.getAccessToken);
  router.get("/calendar/getEvents", verifyAuth, calendarController.getEvents);
  router.post(
    "/calendar/createEvent",
    verifyAuth,
    calendarController.createEvent
  );
  router.delete(
    "/calendar/event/:eventId",
    verifyAuth,
    calendarController.deleteEvent
  );
  router.put(
    "/calendar/event/:eventId",
    verifyAuth,
    calendarController.updateEvent
  );

  return router;
}
