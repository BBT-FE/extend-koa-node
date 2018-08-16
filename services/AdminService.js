const BaseService = require('./BaseService')
const Controller = require('../controller/AdminController')
const AdminController = new Controller()
class AdminService extends BaseService {
  constructor(props) {
    super({
      ...props,
      controller: AdminController,
    })
  }
}
module.exports = new AdminService()
