
// enum http function: post、get
const methods = require('../methods')

module.exports = {
  // search
  'list': { method: methods.get },
  // add
  'insert': { method: methods.post },
  // update
  'update': { method: methods.post },
  // delete
  'delete': { method: methods.post },
}
