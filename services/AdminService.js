// 导入基类
const BaseService = require('./BaseService')
// 导入对应的controller
const Controller = require('../controller/AdminController')
// 生成一次controller
const AdminController = new Controller()
class AdminService extends BaseService {
  constructor() {
    super()
    // 绑定对应的controller
    this.controller = AdminController;
  }
}
module.exports = new AdminService()
