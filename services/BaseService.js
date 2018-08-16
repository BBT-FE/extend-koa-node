const { pojo,filterUnderLine,} = require('../helper') // 获取辅助类里面的一些方法
const { success, failed, successWithCode } = pojo // 获取消息集里的一些辅助方法

// 需要绑定this的方法
const funcs = [
  'list',
  'insert',
  'update',
  'delete',
]
class BaseService {
  constructor() {
    this.controller = null;
    // 循环遍历绑定this
    funcs.forEach(item => {
      this[item] = this[item].bind(this)
    })

  }

  // 查询方法
  async list(ctx) {
    // controller返回的是一个对象，success(成功为true， 失败为false), data(成功则有此数据), err(失败则有此对象)
    const { success: flag, data, err } = await this.controller.list()
    if (flag) {
      // success 为pojo消息集的成功返回
      ctx.body = success(
        data.map(item => 
          //  筛选下划线属性，返回驼峰
          filterUnderLine(item)
        )
      )
    } else {
      // failed 为pojo消息集的失败返回，下同
      ctx.body = failed(err)
    }
  }
  // 插入方法
  async insert(ctx) {
    const { row } = ctx.request.body
    const { success, err } = await this.controller.insert(row)
    if (success) {
      // successWithCode 为没有数据返回时的成功返回
      ctx.body = successWithCode('添加成功') // 没有数据则返回
    } else {
      // 同上
      ctx.body = failed(err)
    }
  }
  // 更新方法
  // 同上
  async update(ctx) {
    const { row } = ctx.request.body
    const { success, err } = await this.controller.update(row)
    if (success) {
      ctx.body = successWithCode('添加成功')
    } else {
      ctx.body = failed(err)
    }
  }
  // 删除方法
  // 同上
  async delete(ctx) {
    const { row } = ctx.request.body
    const { success, err } = await this.controller.delete(row)
    if (success) {
      ctx.body = successWithCode('添加成功')
    } else {
      ctx.body = failed(err)
    }
  }
}

module.exports = BaseService
