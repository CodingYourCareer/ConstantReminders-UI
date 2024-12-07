import { Auth0Client } from '@auth0/auth0-spa-js';

declare global {
    interface ImportMeta {
      env: {
        VITE_AUTH0_DOMAIN: string;
        VITE_AUTH0_CLIENT_ID: string;
      };
    }
  }
  

const auth0: Auth0Client = new Auth0Client({
domain: import.meta.env.VITE_AUTH0_DOMAIN,
clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
});

export default auth0;
