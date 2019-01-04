const Koa = require('./')

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello s world' + JSON.stringify(ctx.query) + JSON.stringify
})

app.listen(3000, () => {
  console.log('server is running at: localhost:3000')
})
