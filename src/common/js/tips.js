/**
 * 提示与加载工具类
 */
import Vue from 'vue'
export default class Tips {
  constructor () {
    this.isLoading = false
  }
  static success (title, duration = 500, icon) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: duration
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出确认窗口
   */
  static confirm (text, title = '提示', confirmText = '确定', confirm, showCancel = true, cancelText = '取消', cancel) {
    return new Promise((resolve, reject) => {
      let _this = Vue.prototype
      wx.showModal({
        title: title,
        content: text,
        confirmText: confirmText,
        cancelText: cancelText,
        showCancel: showCancel,
        cancelColor: '#262626',
        confirmColor: _this.globalData.theme == 'default' ? '#FF66A6' : '#E5C77E',
        success: res => {
          if (res.confirm) {
            confirm()
            // resolve()
          } else if (res.cancel) {
            cancel()
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }

  /**
   * 普通提示窗口
   * icon有效值：success / loading / none
   */
  static toast (title, icon = 'success', duration = 2000) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: duration
      })
    }, 200)
  }

  /**
   * 弹出加载提示
   */
  static loading (title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }

  static alert (text, title = '提示', confirmText = '知道了', payload = {}) {
    return new Promise((resolve, reject) => {
      let _this = Vue.prototype
      wx.showModal({
        title: title,
        content: text,
        confirmText: confirmText,
        confirmColor: _this.globalData.theme == 'default' ? '#FF66A6' : '#E5C77E',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
