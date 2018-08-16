const BaseController = require('./BaseController') // 获得基类

class AdminController extends BaseController {
  constructor() {
    super();
    this.table = 'tour_admin' // 赋值table
  }
}
module.exports = AdminController