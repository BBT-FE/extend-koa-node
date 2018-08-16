// 使用koa-router middleware
const router = require('koa-router')()

// 获取对应的service层
const services = {
  admin: require('../services/AdminService'),
}
// 配置所有的routes文件
const routes = (config => {
	return config.reduce((copy, name) => {
    const obj = require(`./${name}`) // 获取对应个单个文件  admin.js etc..
    const newArr = Object.keys(obj).reduce((total, each) => {
      // 配置path,method etc..
      // {  path: '/api/admin/list', method: post, action: list, server: 'admin' }
      let item = { path: `/api/${name.toLowerCase()}/${each}`, method: obj[each].method, action: each, service: name }
      total.push(item)
      return total
    }, [])
    copy = copy.concat(newArr)
	  return copy
	}, [])
})(Object.keys(services))

// 配置最终的路由，形式为
// router.get(url, service.action)

routes.forEach(item => {
  const { method, path, service: serviceName, action } = item
  const service = services[serviceName]
  router[method](path, service[action])
})
module.exports = router
