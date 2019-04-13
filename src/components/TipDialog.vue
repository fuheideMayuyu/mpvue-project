
<template>
  <view class="tip-dialog" v-if="showDialog">
    <view class="mask" @tap="closeDialog"></view>
    <view class="content">
      <view class="title">{{title}}</view>
      <view class="text">{{content}}</view>
      <view class="button" @tap="closeDialog">{{buttonContent}}</view>
    </view>
  </view>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      props: {
        showDialog: {
          type: Boolean,
          default: false
        },
        title: String,
        content: String,
        buttonContent: String
      },
      methods: {
        closeDialog() {
          this.showDialog = false
        }
      }
  }
</script>

<style lang="scss">
@import '../common/style/basic.scss';
.tip-dialog {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(#000, .6);
}
.content {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 0 48rpx;
  border-radius: 16rpx;
  width: 520rpx;
  background: #fff;
  .title {
    padding: 50rpx 0 44rpx;
    font-size: 32rpx;
    line-height: 44rpx;
    text-align: center;
  }
  .text {
    margin-bottom: 40rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    color: $grayColor;
  }
  .button {
    margin: 0 auto 50rpx;
    border-radius: 30rpx;
    width: 280rpx;
    height: 60rpx;
    font-size: 28rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    background: $themeColor;
  }
}
</style>
