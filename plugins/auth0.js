import createAuth0Client from '@auth0/auth0-spa-js';

export default async ({ app }, inject) => {
  const auth0 = await createAuth0Client({
    domain: process.env.AUTH0_DOMAIN, // From Auth0 settings
    clientId: process.env.AUTH0_CLIENT_ID, // From Auth0 settings
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });

  inject('auth0', auth0);
};
