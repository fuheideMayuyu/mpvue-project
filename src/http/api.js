// 小程序发布时自定义ext字段包含商家编号,通过微信官方提供的API获取,根据不同的商家动态配置url
// 开发者工具支持wx.getExtConfigSync, 实际发布的时候小程序不支持此方法
let extConfig = !wx.getExtConfigSync ? {
  attr: {
    businessNo: 'S1539607410953'
  }
} : wx.getExtConfigSync()
let businessNo = extConfig.attr.businessNo

const api = {
  // 所有请求的url地址在这里配置
  // 登录
  account_login: '/user/' + businessNo + '/account/login', // 登录

}
export default api
