const {
  pojo,
  filterUnderLine,
} = require('../helper')
const {
  success,
  failed,
  successWithCode
} = pojo

const funcs = [
  'list',
  'insert',
  'update',
  'delete',
]
class BaseService {
  constructor({
    controller,
  }) {
    this.controller = controller
    funcs.forEach(item => {
      this[item] = this[item].bind(this)
    })
    // this.list = this.list.bind(this);
    // this.insert = this.insert.bind(this);
    // this.update = this.update.bind(this);
    // this.delete = this.delete.bind(this);

  }

  async list(ctx) {
    const { success: flag, data, err } = await this.controller.list()
    if (flag) {
      ctx.body = success(data.map(item => filterUnderLine(item)))
    } else {
      ctx.body = failed(err)
    }
  }
  async insert(ctx) {
    const { row } = ctx.request.body
    const { success, err } = await this.controller.insert(row)
    if (success) {
      ctx.body = successWithCode('添加成功')
    } else {
      ctx.body = failed(err)
    }
  }
  async update(ctx) {
    const { row } = ctx.request.body
    const { success, err } = await this.controller.update(row)
    if (success) {
      ctx.body = successWithCode('添加成功')
    } else {
      ctx.body = failed(err)
    }
  }
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

// /**
//  * 
//  * @param {*} config  对应的方法，要定义的哪几个方法模块，单个services层传入
//  * @param {*} file 对应的controller文件名称
//  * @return 返回一个对应好的对象
//  */
// module.exports = (config, file) => {
//   const controller = require(`../../controller/${file}`)
// 	return config.reduce((copy, name) => {
//     copy[name] = async ctx => {
//       let res;
//       try {
//         const val = ctx.request.body
//         await controller[name](val).then(result => {
//           // 没有数据返回的接口直接返回msg和code
//           if (list.indexOf(name) !== -1) {
//             res = successWithCode('操作成功')
//             return
//           }
//           // 其他模块方法直接过滤数据下划线
//           const arr = result.map(item => filterUnderLine(item))
//           res = success(arr)
//         })
//       } catch(err) {
//         res = failed(err)
//       }
//       ctx.body = res
//     }
// 	  return copy
// 	}, {})
// }

// const { now } = this.app.mysql.literals;
// newItem.gmt_modified = now;
// newItem.gmt_create = now;
// newItem.creator = this.ctx.user.name;
// newItem.lastModifier = this.ctx.user.name;
// console.log(this.table, newItem);
// const dbResult = yield this.app.mysql.insert(this.table, newItem);
// if (dbResult.message || dbResult.affectedRows !== 1) {
//   return {
//     success: false,
//     msg: dbResult.message,
//   };

// }
// return {
//   success: true,
//   data: {
//     id: dbResult.insertId,
//   },
// };