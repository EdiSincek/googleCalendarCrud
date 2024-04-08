import express from "express";
import createGoogleOAuthController from "../controllers/googleOauthController.js";
import createCalendarController from "../controllers/calendarController.js";
export default function createGoogleRouter(oauth2Client, calendarService) {
  const googleOAuthController = createGoogleOAuthController(oauth2Client);
  const calendarController = createCalendarController(calendarService);
  const router = express.Router();
  router.get("/login", googleOAuthController.login);
  router.get("/oauth2callback", googleOAuthController.getAccessToken);
  router.get("/calendar/getEvents", calendarController.getEvents);
  router.post("/calendar/createEvent", calendarController.createEvent);
  router.delete("/calendar/event/:eventId", calendarController.deleteEvent);
  return router;
}
