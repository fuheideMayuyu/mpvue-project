import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openId: '',
    token: '',
    countShopCar: '', // 购物车数量
    fbuyerType: 0, // 买家身份 0：普通用户，1：导游用户 2 店主
    fbuyerUin: null, // 用户ID
    scene: '', // 用户使用小程序的场景值
  },
  mutations: {
    [types.SET_OPEN_ID] (state, v) {
      state.openId = v
    },
    [types.ACCESS_TOKEN] (state, v) {
      state.token = v
    },
    [types.COUNT_SHOP_CAR] (state, v) {
      state.countShopCar = v
    },
    [types.BUYER_TYPE] (state, v) {
      state.fbuyerType = v
    },
    [types.BUYER_ID] (state, v) {
      state.fbuyerUin = v
    },
    [types.SCENE] (state, v) {
      state.scene = v
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {}
      }
    })
  ]
})
export default store
