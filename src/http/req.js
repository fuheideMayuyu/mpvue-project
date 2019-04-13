import fly from './config'
import qs from 'qs'

import config from '../config'
const host = config.host

// 通用的get请求
const get = (params) => {
  return fly.get(`${host}${params.url}`, qs.stringify(params.data))
}

// 通用的post请求
const post = (params) => {
  if (params.headers && params.headers['Content-Type'] == 'application/json') {
    fly.config.headers = params.headers
    return fly.post(`${host}${params.url}`, JSON.stringify(params.data))
  } else {
    fly.config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return fly.post(`${host}${params.url}`, qs.stringify(params.data))
}

export default {get, post}
