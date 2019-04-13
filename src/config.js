// 生产环境下extConfig配置域名即可, 这个文件不要动了
let extConfig = !wx.getExtConfigSync ? {
  host: 'https://s2b2c.xyb2b.com'
} : wx.getExtConfigSync()

let host = ''
if (extConfig.host) host = extConfig.host
const config = {
  host
}
export default config
