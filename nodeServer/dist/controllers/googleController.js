import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/api/google/oauth2callback");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
export const googleController = {
    getAuthUrl: (req, res) => {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
        });
        res.send({ url: authUrl });
    },
    getAccessToken: async (req, res) => {
        const { code } = req.query;
        try {
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            console.log(tokens);
            //TODO: Save tokens to db;
        }
        catch (error) {
            res
                .sendStatus(500)
                .send({ error: "Error fetching access token", details: error });
        }
    },
};
