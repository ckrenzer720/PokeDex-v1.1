export const auth0Config = {
  domain: "dev-qsm7gsoj1nzkgnvd.us.auth0.com",
  clientId: "3TUh797gyzQyb2PCiAndJ4Wh56sKUdme",
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: "openid profile email",
    response_type: "token id_token",
  },
  cacheLocation: "localstorage",
  useRefreshTokens: true,
};
