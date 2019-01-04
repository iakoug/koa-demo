const http = require('http')

class App {
  constructor() {
    this.middleware = []
  }

  listen(...args) {
    http.createServer(this.cb).listen(...args)
  }

  callback() {
    return (req, res) => {
      this.cb(req, res)
    }
  }

  use(fn) {
    this.middleware.push(fn)
    this.cb = fn
  }
}

module.exports = App
