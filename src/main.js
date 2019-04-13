import Vue from 'vue'
import App from './App'
import store from './store/index'

import Tips from './common/js/tips'
import wxTimer from './common/js/wxTimer'
import Req from './http/req'
import Api from './http/api'

import './common/style/iconfont.scss'
import './common/style/reset.scss'
import './common/style/common.scss'

Vue.config.productionTip = false
App.mpType = 'app'

let extConfig = !wx.getExtConfigSync ? {
  attr: {
    imageBaseUrl: 'http://s2b2c-img.xyb2b.com/'
  }
} : wx.getExtConfigSync()

Vue.prototype.$store = store
Vue.prototype.$tips = Tips
Vue.prototype.$api = Api
Vue.prototype.$http = Req
Vue.prototype.$wxTimer = wxTimer
Vue.prototype.$unPay = true
Vue.prototype.$imageBaseUrl = extConfig.attr.imageBaseUrl
Vue.prototype.$basicUrl = extConfig.host

const app = new Vue(App)
app.$mount()

// 分享 转发
const share = {
  install () {
    Vue.mixin({
      onShareAppMessage (res) {
        return {
          title: '发现一个小程序',
          // desc: '',
          imageUrl: '',
          path: ''
        }
      }
    })
  }
}
Vue.use(share)

