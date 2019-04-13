/**
 * 一些通用的工具
 */
export default class Common {
  // 滑出动画
  static animationFn (duration, setOut, isShow, _this) {
    let that = _this
    let animation = wx.createAnimation({
      duration: duration,
      timingFunction: 'linear' // 定义动画效果，当前是匀速
    })
    that.animation = animation // 将该变量赋值给当前动画
    animation.translateY(382).step() // 先在y轴偏移，然后用step()完成一个动画
    that.animationData = animation.export()
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.animationData = animation.export()
      that.isShow = isShow
    }, setOut)
  }

  // 时间格式化
  static dateFormat (time, format = 'YYYY-MM-DD') {
    // YYYY-MM-DD hh:mm:ss
    let date = new Date(time)

    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    if (format === 'YYYY-MM-DD') {
      return year + '-' + month + '-' + day
    } else {
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
  }

  // 字符串超出指定长度部分使用…代替
  static getByteLen (text, len = 16) {
    let l = 0, result = []
    for (let i = 0; i < text.length ; i++) {
      let reg = text.charAt(i)
      if (reg.match(/[^\x00-\xff]/ig) != null) {
        l += 2
      } else {
        l += 1
      }

      if (l < len) result.push(reg)
    }
    return result.join('') + '...'
  }

  // 通过二维码进入小程序 获取scene参数
  static getSceneParams (scene) {
    let paramList = scene.split('%2C')
    let obj = {}
    paramList.forEach(item => {
      let temp = item.split('%3D')
      obj[temp[0]] = temp[1]
    })
    return obj
  }

  // 对象数组，根据对象某个属性排序
  static sortHandle (prop, sort) {
    // 根据prop属性排序
    // sort 不传默认升序， true升序 false降序
    if(sort ==  undefined){
      sort = 1;
    }else{
      sort = (sort) ? 1 : -1;
    }
    return function (a, b) {
      a = a[prop];
      b = b[prop];
      if(a < b){
        return sort * -1;
      }
      if(a > b){
        return sort * 1;
      }
      return 0;
    }
  }

  // 选择本地图片
  static chooseImage () {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['orignal', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }

  // obj转成url参数
  static setURLParams (obj) {
    let urlParams = ''
    Object.keys(obj).forEach(prop => {
      urlParams += `&${prop}=${obj[prop]}`
    })
    return urlParams.replace('&', '?')
  }
}
