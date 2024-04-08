import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

export default function createGoogleOAuthController(
  oauth2Client: OAuth2Client
) {
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];

  return {
    login: (req: Request, res: Response) => {
      try {
        const authUrl = oauth2Client.generateAuthUrl({
          access_type: "offline",
          scope: SCOPES,
        });
        res.redirect(authUrl);
      } catch (error) {
        res
          .status(500)
          .send({ error: "Error generating auth url", details: error });
      }
    },
    getAccessToken: async (req: Request, res: Response) => {
      const { code } = req.query;
      try {
        const response = await oauth2Client.getToken(code as string);
        const { tokens } = response;
        oauth2Client.setCredentials(tokens);
        return res
          .status(200)
          .send({ message: "Access token set successfully" });
      } catch (error) {
        res
          .status(500)
          .send({ error: "Error fetching access token", details: error });
      }
    },
  };
}
