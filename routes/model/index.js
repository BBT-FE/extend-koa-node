
const methods = require('../methods')

module.exports = {
  'list': { method: methods.get },
  'insert': { method: methods.post },
  'update': { method: methods.post },
  'delete': { method: methods.post },
}
