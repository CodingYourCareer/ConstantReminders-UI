import Auth0Provider from 'next-auth/providers/auth0'
import { decode } from 'jsonwebtoken'
import { NuxtAuthHandler } from '#auth'

const {
  nextAuthSecret,
  auth0ClientId,
  auth0ClientSecret,
  auth0Issuer,
  auth0ApiAudience,
  public: { isDeployed },
} = useRuntimeConfig() // Ignore this error. Nuxt auto imports it but typescript is stupid

async function refreshAccessToken(accessToken) {
  try {
    const url = `${auth0Issuer}/oauth/token`

    // Construct the request body
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: auth0ClientId,
      refresh_token: accessToken.refreshToken,
    })

    if (auth0ClientSecret) {
      params.append('client_secret', auth0ClientSecret)
    }

    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const res = await req.json()

    // If the request was not successful, handle the error
    if (!req.ok) {
      throw new Error(res.error_description || 'Failed to refresh token')
    }

    return {
      ...accessToken,
      accessToken: res.access_token,
      accessTokenExpires: Date.now() + res.expires_in * 1000,
      // If Auth0 doesn't return a new refresh_token, fall back to the old one
      refreshToken: res.refresh_token ?? accessToken.refreshToken,
    }
  }
  catch (error) {
    console.error(error)
    return {
      ...accessToken,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NuxtAuthHandler({
  debug: isDeployed ? false : true,
  secret: nextAuthSecret,
  providers: [
    Auth0Provider.default({
      id: 'auth0',
      clientId: auth0ClientId,
      clientSecret: auth0ClientSecret,
      issuer: auth0Issuer,
      authorization: {
        params: {
          scope: 'openid profile email',
          audience: auth0ApiAudience,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the access_token in the encrypted JWT.
      if (account && profile) {
        if (account.access_token) {
          const decoded = decode(account.access_token)
          token.accessToken = account.access_token
          if (decoded && typeof decoded !== 'string')
            token.roles = decoded.roles
        }
        if (account.expires_at)
          token.accessTokenExpires = account.expires_at * 1000

        token.refreshToken = account.refresh_token
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Make access token available on the client.
      session.roles = token.roles
      session.accessToken = token.accessToken

      return session
    },
  },
})
