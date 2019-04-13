/**
 * 请求公共方法（不含业务代码）
 */
import Vue from 'vue'
export default class QueryHandle {
  static postQuery (url, params, contentType) {
    let that = Vue.prototype
    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        data: params
      }

      if (contentType == 'json') options.headers = {
        'Content-Type': 'application/json'
      }
      that.$http.post(options).then(res => {
        if (res.retCode === 500) {
          this.$tips.toast('系统异常', 'none')
          return false
        }

        if (res.retCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}
