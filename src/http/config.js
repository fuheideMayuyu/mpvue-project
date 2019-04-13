const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
const store = require('../store/index')

// 设置超时
fly.config.timeout = 10000

// 设置请求基地址 开发环境配置 通过ext配置,一旦配置了域名baseURL将会失效
let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}

fly.config.baseURL = 'http://' + extConfig.attr.host.ip + ':' + extConfig.attr.host.port
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  let token = store.default.state.token
  let openId = store.default.state.openId

  // 给所有请求添加自定义header
  request.headers['X-Tag'] = 'flyio'

  // token设置
  let type = request.url.split('/')[1]
  if (type !== 'sku') {
    if (request.url.indexOf('login') === -1) request.headers['accessToken'] = token
  }

  if (openId) request.headers['openId'] = openId

  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    // 发生网络错误后会走到这里
    return Promise.resolve(err)
  }
)
export default fly
