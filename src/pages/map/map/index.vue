<template>
  <div class="map">
    <map
      id="map"
      :longitude="longitude"
      :latitude="latitude"
      scale="5"
      :markers="markers"
      :show-location="true"
      :style="{width: systemInfo.width, height: systemInfo.height}">
      <cover-view class="pause">
        <!--<cover-image class="map-control-img" src="/static/images/location.png" />-->
        <!--<button class="open-app-btn" open-type="launchApp" app-parameter="wechat" @error="launchAppError">-->
          <!--打开APP-->
        <!--</button>-->
      </cover-view>
    </map>
  </div>
</template>
<script>
  export default {
    name: 'map',
    data () {
      return {
        longitude: 139.79051113128665, // 经度
        latitude: 35.67859867009468, // 纬度
        markers: [{
          iconPath: '/static/images/location.png',
          id: 0,
          latitude: 35.67859867009468,
          longitude: 139.79051113128665,
          width: 32,
          height: 32
        }],
        systemInfo: {
          width: '',
          height: ''
        }
      }
    },
    onLoad () {},
    mounted () {
      const systemInfo = wx.getSystemInfoSync()
      this.systemInfo.width = systemInfo.windowWidth + 'px'
      this.systemInfo.height = systemInfo.windowHeight + 'px'
    },
    methods: {
      launchAppError (e) {
        console.log(e)
      }
    }
  }
</script>
<style scoped>
.map-control-img {
  width: 60rpx;
  height: 60rpx;
}
  .open-app-btn {
    width: 200rpx;
    height: 50rpx;
    line-height: 50rpx;
  }
</style>
