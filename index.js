const http = require('http')

let context = require('./context')
let request = require('./request')
let response = require('./response')

class App {
  constructor() {
    this.middleware = []
    this.context = context
    this.request = request
    this.response = response
  }

  listen(...args) {
    http.createServer(this.callback()).listen(...args)
  }

  callback() {
    return (req, res) => {
      const ctx = this.createContext(req, res)

      this.compose(this.middleware)(ctx).then(() => this.responseBody(ctx))
    }
  }
  
  createNext(middleware, oldNext) {
    return async ctx =>
      await middleware(ctx, oldNext)
  }

  compose(middlewares) {
    return middlewares.reduceRight((oldNext, fn) =>
      this.createNext(fn, oldNext), async () => Promise.resolve())
  }

  use(fn) {
    this.middleware.push(fn)
  }

  createContext(req, res) {
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
  }

  responseBody(ctx) {
    const content = ctx.body

    if (typeof content === 'string') {
      ctx.res.end(content)
    } else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content))
    }
  }
}

module.exports = App
