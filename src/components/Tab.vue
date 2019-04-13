<template>
  <scroll-view scroll-x class="bg-white nav">
    <view class="flex text-center">
      <view v-for="(item, index) in list"
            :key="index"
            class="cu-item flex-sub"
            :class="index==TabCur?'text-color text-bold cur':''"
            @tap="tabSelect"
            :data-id="index">
        {{item}}
      </view>
    </view>
  </scroll-view>
</template>
<script>
  export default {
    props: {
      list: Array, // tab列表
    },
    data () {
      return {
        TabCur: 0
      }
    },
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id
        this.$emit('tabClick', this.TabCur)
      }
    }
  }
</script>
<style scoped lang="scss">
  .bg-white {
    background-color: #fff;
    color: #666;
  }
  .flex {
    display: flex;
  }
  .nav {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    white-space: nowrap;
    color: #333333;
    border-bottom: 1px solid $borderColor;
    .cu-item {
      height: 84rpx;
      display: inline-block;
      line-height: 84rpx;
      margin: 0 10rpx;
      padding: 0 20rpx;
      &.cur {
        border-bottom: 4rpx solid;
      }
    }
  }
</style>
