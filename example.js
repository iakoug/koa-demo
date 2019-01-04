const Koa = require('./')

const app = new Koa

app.use((req, res) => {
  res.writeHead(200);
  res.end('hello s world');
})

app.listen(3000, () => {})
