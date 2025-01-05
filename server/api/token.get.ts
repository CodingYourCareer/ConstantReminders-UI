import { getToken } from '#auth'

export default eventHandler(async (event) => {
  // Decoded token (default)
  const decoded = await getToken({ event })
  // Raw token (JWT string)
  const raw = await getToken({ event, raw: true, secret: process.env.NEXTAUTH_SECRET })

  return { decoded, raw }
})
