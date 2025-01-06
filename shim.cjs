module.exports.handler = async (event, context) => {
  const app = await import('./.output/server/index.mjs')
  return app.handler(event, context)
}
