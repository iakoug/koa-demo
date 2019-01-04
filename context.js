const ctx = {}

function delegateSet(prop, name) {
  ctx.__defineSetter__(name, function(val) {
    this[prop][name] = val
  })
}

function delegateGet(prop, name) {
  ctx.__defineGetter__(name, function() {
    return this[prop][name]
  })
}

const requestSet = []
const requestGet = ['query']

const responseSet = ['body', 'status']
const responseGet = responseSet

requestSet.forEach(ele => delegateSet('request', ele))

requestGet.forEach(ele => delegateGet('request', ele))

responseSet.forEach(ele => delegateSet('response', ele))

responseGet.forEach(ele => delegateGet('response', ele))

module.exports = ctx
