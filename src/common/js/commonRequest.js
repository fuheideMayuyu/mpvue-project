/**
 * 通用业务逻辑
 */

import Vue from 'vue'

export default class CommonReq {
  // 登录
  static login () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          if (res.code) {
            Vue.prototype.$http.post({
                url: Vue.prototype.$api.account_login,
                data: {
                  code: res.code
                }
              }).then(httpRes => {
                if (httpRes.retCode === 200) {
                  let data = httpRes.retEntity
                  Vue.prototype.$store.commit('SET_OPEN_ID', data.openId)
                  Vue.prototype.$store.commit('ACCESS_TOKEN', data.access_token)
                  Vue.prototype.$store.commit('BUYER_TYPE', data.buyerInfo.fbuyerType)
                  Vue.prototype.$store.commit('BUYER_ID', data.buyerInfo.fbuyerUin)
                  resolve(data)
                } else {
                  Vue.prototype.$tips.alert(httpRes.retMsg)
                  reject(httpRes)
                }
              })
          } else {
            reject(res)
            Vue.prototype.$tips.alert(res.errMsg)
          }
        },
        fail: err => {
          $tips.alert(JSON.stringify(err))
        }
      })
    })
  }

  // 查询购物车数量
  static getCountShopCar (remove) {

    function removeHandle () {
      Vue.prototype.$store.commit('COUNT_SHOP_CAR', '')
      wx.removeTabBarBadge({
        index: 2
      })
    }

    Vue.prototype.$http.post({
      url: Vue.prototype.$api.count_shop_car
    }).then(res => {
      if (res.retCode === 200) {
        let countShopCar = res.retEntity > 0 ? (res.retEntity + '') : ''

        if (!countShopCar) {
          removeHandle()
          return false
        }

        if (countShopCar && !remove) {
          wx.setTabBarBadge({
            index: 2,
            text: countShopCar
          })
        }
        Vue.prototype.$store.commit('COUNT_SHOP_CAR', countShopCar)
      } else {
        removeHandle()
      }
    })
  }

  // 订单支付
  static paymentHandle (fdealId) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post({
        url: Vue.prototype.$api.pay_weixinPay,
        method: 'POST',
        data: {
          forderId: fdealId,
          openid: Vue.prototype.$store.state.openId
        }
      }).then(res => {
        if (res.retCode === 200) {
          let data = res.retEntity

          if (typeof data == 'string') {
            Vue.prototype.$tips.success('支付成功', 2000, 'none')
            resolve(fdealId)
          } else {
            wx.requestPayment({
              'timeStamp': data.timeStamp,
              'nonceStr': data.nonceStr,
              'package': data.package,
              'signType': data.signType,
              'paySign': data.paySign,
              success: function (res) {
                Vue.prototype.$http.post({
                  url: Vue.prototype.$api.pay_weixinPayQuery,
                  method: 'POST',
                  data: {
                    forderId: fdealId
                  }
                }).then(res => {
                  if (res.retCode === 10006) {
                    Vue.prototype.$tips.success('支付成功', 2000, 'none')
                    resolve(fdealId)
                  } else if (res.code === 10005) {
                    Vue.prototype.$tips.success('该订单不是待付款订单', 2000, 'none')
                  } else {
                    Vue.prototype.$tips.alert(res.errMsg)
                  }
                })
              },
              'fail': function (res) {
                // Vue.prototype.$tips.alert(res.errMsg)
              }
            })
          }
        }
      })
    })
  }

  // 领取优惠券
  static queryCoupon (_this, couponId) {
    return new Promise((resolve, reject) => {
      _this.$http.post({
          url: _this.$api.coupon_takeCoupon,
          data: {fcouponId: couponId}
        }).then(res => {
          let status = {
            60002: '您已领取过该券',
            60003: '未找到优惠劵',
            60004: '优惠劵已失效',
            60005: '优惠劵已删除',
            60006: '非常抱歉,该券只有老用户可以领哦,您可以看看其他的券',
            60007: '非常抱歉,该券为新用户专享哦,您可以看看其他的券',
            60008: '领取失败',
            60009: '没领到哦, 该优惠券领取已达上限',
            60010: '未绑定手机号'
          }

          if (res.retCode === 500) {
            _this.$tips.toast('系统异常', 'none')
            return false
          } else {
            if (res.retCode === 200) {
              _this.$tips.toast('领取成功', 'none', 1000)
              resolve(res)
            } else if (res.retCode === 60010) { // 未绑定手机号需要绑定手机号
              if (_this.$parent && _this.$parent.bindPhoneHandle) {
                _this.$parent.bindPhoneHandle({fcouponId: couponId})
              } else {
                _this.isEditIdShow = true
              }
            } else {
              reject({
                status: status[res.retCode],
                retEntity: res.retEntity
              })
            }
          }
        })
    })
  }

  // 上传图片
  static uploadImgFile (filePath) {
    let uploadTask

    let promiseFile = new Promise((resolve, reject) => {
      uploadTask = wx.uploadFile({
        url: Vue.prototype.$basicUrl + '/helper/fdfs/uploadFile',
        filePath: filePath,
        name: 'file',
        success: function (res) {
          resolve(res.data)
        }
      })
    })

    let promiseProgress = new Promise((resolve, reject) => {
      uploadTask.onProgressUpdate((res) => {
        resolve(res.progress == 100 ? '' : res.progress)
      })
    })

    return Promise.all([promiseFile, promiseProgress])
  }

  // 获取文案
  static getCopywtriting (fcopywtritingType) {
    // 参数 ： fcopywtritingType 文案类型  0：商品推广文案，1：店主海报推广文案，2：小程序分享推广文案
    let _this = Vue.prototype
    return new Promise((resolve, reject) => {
      _this.$http.post({
        url: _this.$api.goods_copywtriting_search,
        data: {
          fcopywtritingType: fcopywtritingType
        }
      }).then(res => {
        if (res.retCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}
