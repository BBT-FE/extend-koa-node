const pool = require('../lib/mysql')
const { query } = pool
const { STATUS } = require('../enum')
const { 
  NtNUpdate,
  filterCamel,
 } = require('../helper')

class BaseController {
  constructor() {
    this.table = ''
  }

  async list() {
    const sql = `select * from ${this.table} where status != ?`
    return await query(sql, [STATUS.DELED])
  }

  async insert(row) {
    const {
      keys,
      vals
    } = filterCamel(row)
    const names = keys.join(',')
    const questions = keys.map(item => '?').join(',')
    const sql = `insert into ${this.table}(${names},create_time,status) values(${questions},now(),?)`
    return await query(sql, [...vals, STATUS.NORMAL])
  }

  async update(row) {
    const {
      id,
    } = row
    delete row.id
    let _sql = `update ${this.table} set `
    const {
      sql,
      args
    } = NtNUpdate(row, _sql)
    _sql = sql + 'where id = ?'
    return await query(_sql, [...args, id])
  }

  async delete(row) {
    const {
      id
    } = row
    const sql = `update ${this.table} set status = ? where id = ?`
    return await query(sql, [STATUS.DELED, id])
  }

  excute(sql, vals) {
    return await = query(sql, vals)
  }
  log({func, err}) {
    console.log(`excute function[${func}] occured error : ${err.message || err}`)
  }

}

module.exports = BaseController