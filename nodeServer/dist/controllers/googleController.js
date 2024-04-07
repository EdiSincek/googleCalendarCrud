import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3001/google/oauth2callback");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
export const googleController = {
    login: (req, res) => {
        try {
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: "offline",
                scope: SCOPES,
            });
            res.redirect(authUrl);
        }
        catch (error) {
            res
                .sendStatus(500)
                .send({ error: "Error generating auth url", details: error });
        }
    },
    getAccessToken: async (req, res) => {
        const { code } = req.query;
        try {
            const response = await oauth2Client.getToken(code);
            const { tokens } = response;
            oauth2Client.setCredentials(tokens);
            return res.status(200).send({ message: "Access token set successfully" });
        }
        catch (error) {
            res
                .sendStatus(500)
                .send({ error: "Error fetching access token", details: error });
        }
    },
};
