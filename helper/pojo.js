// 成功返回
const success = (result) => {
  return {
    retCode: 200,
    retValue: result
  }
}
// 成功没数据返回
const successWithCode = msg => {
  return {
    retCode: 200,
    msg,
  }
}

// 失败返回
const failed = (error) => {
  console.log(error)
  return {
    retCode: 500,
    msg: error.message || error || '服务器异常'
  }
}



module.exports = {
  success,
  failed,
  successWithCode,

}
