const BaseController = require('./BaseController')

class AdminController extends BaseController {
  constructor() {
    super();
    this.table = 'tour_admin'
  }
}
module.exports = AdminController