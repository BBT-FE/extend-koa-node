const pool = require('../lib/mysql') // 导入封装好的mysql库
const { query } = pool // 导入query方法
const { STATUS } = require('../enum') // 导入枚举类型STATUS
const { NtNUpdate,filterCamel, } = require('../helper') // 导入helper内相关方法

class BaseController {
  constructor() {
    this.table = ''
  }
  // 查询表内所有数据（非删除）
  async list() {
    const sql = `select * from ${this.table} where status != ?`
    return await query(sql, [STATUS.DELED])
  }
  // 插入新数据
  async insert(row) {
    const {
      keys,
      vals
    } = filterCamel(row) // 将驼峰命令转换为下划线
    const names = keys.join(',') // 对应的参数
    const questions = keys.map(item => '?').join(',') // 对应的参数占位符
    // 补全sql语句 insert into table (x, xx) values(x, xx)
    const sql = `insert into ${this.table}(${names},create_time,status) values(${questions},now(),?)`
    return await query(sql, [...vals, STATUS.NORMAL])
  }

  async update(row) {
    const {
      id,
    } = row; // 获取数据内的id
    // 删除id
    delete row.id
    // 启始sql
    let _sql = `update ${this.table} set `
    const {
      sql,
      args
    } = NtNUpdate(row, _sql)// 获取对象内非空值，加工sql 语句  update table set name=?, val= ?
    // 补全sql语句 update table set name = ?, val = ? where id = ?
    _sql = sql + 'where id = ?'
    return await query(_sql, [...args, id])
  }

  async delete(row) {
    const {
      id
    } = row // 获取数据内的id
    // 补全sql update table set status = ? where id = ?
    const sql = `update ${this.table} set status = ? where id = ?`
    return await query(sql, [STATUS.DELED, id])
  }

  excute(sql, vals) {
    // 执行方法
    return await = query(sql, vals)
  }
  // log 方法
  log({func, err}) {
    console.log(`excute function[${func}] occured error : ${err.message || err}`)
  }

}

module.exports = BaseController