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

  list() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `select * from ${this.table} where status != ?`
        const result = query(sql, [STATUS.DELED])
        resolve(result)
      } catch (err) {
        this.log('list', err)
        reject(err)
      }
    })
  }

  insert(row) {
    return new Promise((resolve, reject) => {
      try {
        const {
          keys,
          vals
        } = filterCamel(row)
        const names = keys.join(',')
        const questions = keys.map(item => '?').join(',')
        const sql = `insert into ${this.table}(${names},create_time,status) values(${questions},now(),?)`
        const result = query(sql, [...vals, STATUS.NORMAL])
        resolve(result)
      } catch (err) {
        this.log('insert', err)
        reject(err)
      }
    })

  }

  update(row) {
    return new Promise((resolve, reject) => {
      try {
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
        const result = query(_sql, [...args, id])
        resolve(result)
      } catch (err) {
        this.log('update', err)
        reject(err)
      }
    })
    
  }

  delete(row) {
    return new Promise((resolve, reject) => {
      try {
        const {
          id
        } = row
        const sql = `update ${this.table} set status = ? where id = ?`
        const result = query(sql, [STATUS.DELED, id])
        resolve(result)
      } catch (err) {
        this.log('delete', err)
        reject(err)
      }
    })
    
  }

  excute(sql, vals) {
    return new Promise((resolve, reject) => {
      try {
        const result = query(sql, vals)
        resolve(result)
      } catch(err) {
        this.log('excute', err)
        reject(err)
      }
    })
  }
  log({func, err}) {
    console.log(`excute function[${func}] occured error : ${err.message || err}`)
  }

}

module.exports = BaseController