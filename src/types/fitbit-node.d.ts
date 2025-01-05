declare module 'fitbit-node' {
  interface FitbitClientOptions {
    clientId: string;
    clientSecret: string;
  }

  class FitbitApiClient {
    constructor(options: FitbitClientOptions);
    getAuthorizeUrl(scope: string[], redirectUrl: string): string;
    getAccessToken(code: string, redirectUrl: string): Promise<any>;
    refreshAccessToken(accessToken: string, refreshToken: string, expiresIn: number): Promise<any>;
    get(path: string, accessToken: string, userId?: string): Promise<any>;
  }

  export default FitbitApiClient;
} 