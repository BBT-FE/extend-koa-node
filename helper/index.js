const pojo = require('./pojo')

/**
 * 
 * @param {Object} params  参数对象
 * @param {String} sql sql语句
 * @description 根据参数对象去改变sql语句，最后返回对应的sql语句
 * @return 返回处理后的sql语句
 */
const update = (params, sql) =>  {
  let keys = Object.keys(params)
  let arr = []
  keys.forEach((key) => {
    if (key) {
      sql = sql + `${key} = ? ,`
      arr.push(params[key])
    }
  })
  sql = sql.substring(0, sql.length - 1)
  return {
    args: arr,
    sql,
  }
}
/**
 * 
 * @param {String} val  原下划线值
 * @param {String} char 要替换的字符
 * @description 根据原key去替换下划线后转为驼峰
 * @return 返回处理后的key
 */
const replaceUnderLine = (val, char = '_') => {
  const arr = val.split('')
  const index = arr.indexOf(char)
  arr.splice(index, 2, arr[index+1].toUpperCase())
  val = arr.join('')
  return val
}

/**
 * 
 * @param {String} val  原下划线值
 * @description 下划线转驼峰
 * @return 返回处理后的key
 */
const underline2Camel = (val) => {
  return val.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 
 * @param {String} val  原key
 * @param {String} char  要替换的字符
 * @description 驼峰转下划线
 * @return 返回处理后的key
 */
const camel2UnderLine = (val, char = '_') => {
  return val.replace(/([A-Z])/g,`${char}$1`).toLowerCase();
}

/**
 * 
 * @param {Object} obj  原对象
 * @param {String} char  要替换的字符
 * @description 对象驼峰转下划线
 * @return 返回处理后的keys 和 对应的vals { aboutExample: 'example' }, ['about_example'], ['example']
 * @return { Array } keys 
 * @return { Array } vals 
 */
const fileterCamel = (obj, char = '_') => {
  const keys = Object.keys(obj)
  return keys.reduce((init, item) => {
    const str = item
    if (~item.indexOf(char)) {
      str = camel2UnderLine(item)
    }
    init.keys.push(str)
    init.vals.push(obj[item])
    return init
  }, {
    keys: [],
    vals: [],
  })
}

/**
 * 
 * @param {Object} obj  原对象
 * @param {String} char  要替换的字符
 * @description 对象下划线转驼峰
 * @return 返回处理后的对象 { about_example: 'example' } { aboutExample: 'example' }
 * @return { Object } obj  
 */
const  filterUnderLine = (obj, char = '_') => {
  const arr =  Object.keys(obj).filter(item => ~item.indexOf(char))
  arr.forEach(item => {
    const val = obj[item]
    const key = underline2Camel(item)
    obj[key] = val
    delete obj[item]
  })
  return obj
}

module.exports = {
  NtNUpdate: update,
  filterUnderLine,
  replaceUnderLine,
  replaceCamel: fileterCamel,
  pojo,
}
