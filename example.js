const Koa = require('./')

const app = new Koa()

app.use(async (ctx, next) => {
  // console.log(1)
  await next()
  ctx.body = 'hello s world'
  // console.log(1, 'end')
})

app.use(async (ctx, next) => {
  // console.log(2)
  throw Error(123)
  await next()
  // console.log(2, 'end')
})

app.on('error', err => console.log(err, 'err'))

app.listen(3000, () => console.log('server is running at: localhost:3000'))
