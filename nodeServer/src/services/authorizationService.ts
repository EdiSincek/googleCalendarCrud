import { OAuth2Client } from "google-auth-library";

export class AuthorizationService {
  private oauthClient: OAuth2Client;

  constructor(oauthClient: OAuth2Client) {
    this.oauthClient = oauthClient;
  }

  async verifyToken(idToken: string) {
    try {
      const ticket = await this.oauthClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      throw new Error("Token verification failed");
    }
  }
}
