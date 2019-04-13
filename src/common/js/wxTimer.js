var wxTimer = function (initObj) {
  initObj = initObj || {}
  this.beginTime = initObj.beginTime // 开始时间(ms)
  this.interval = initObj.interval || 0 // 间隔时间
  this.complete = initObj.complete // 结束任务
  this.intervalFn = initObj.intervalFn // 间隔任务
  this.name = initObj.name // 当前计时器在计时器数组对象中的名字

  this.sysEndTime = initObj.sysEndTime
  this.endSystemTime = initObj.endSystemTime // 结束的系统时间
}

wxTimer.prototype = {
  // 开始
  start (self) {
    this.endTime = new Date('1970/01/01').getTime() + this.beginTime
    let that = this
    // 开始倒计时
    let count = 0 // 这个count在这里应该是表示s数，js中获得时间是ms，所以下面*1000都换成ms
    function begin () {
      let tmpTime = new Date(that.endTime - 1000 * count++)
      let tmpTimeStr = tmpTime.toString().substr(16, 8) // 去掉前面的年月日就剩时分秒了

      let wxTimerSecond = (tmpTime.getTime() - new Date('1970/01/01 00:00:00').getTime()) / 1000
      let wxTimerList = self.wxTimerList

      // 更新计时器数组
      if (wxTimerList) {
        wxTimerList[that.name] = {
          wxTimer: tmpTimeStr,
          wxTimerSecond: wxTimerSecond
        }
      }

      self.wxTimer = tmpTimeStr
      self.wxTimerSecond = wxTimerSecond
      self.wxTimerList = wxTimerList

      // 时间间隔执行函数
      if ((count - 1) % that.interval === 0 && that.intervalFn) {
        that.intervalFn()
      }
      // 结束执行函数
      if (wxTimerSecond <= 0) {
        if (that.complete) {
          that.complete()
        }
        that.stop()
      }
    }
    begin()
    this.intervarID = setInterval(begin, 1000)
  },
  // 结束
  stop () {
    clearInterval(this.intervarID)
  },
  // 校准
  calibration () {
    this.endTime = this.endSystemTime - Date.now()
  }
}

module.exports = wxTimer
