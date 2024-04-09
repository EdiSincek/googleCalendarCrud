export class AuthorizationService {
  oauthClient;
  constructor(oauthClient) {
    this.oauthClient = oauthClient;
  }
  async verifyToken(idToken) {
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
