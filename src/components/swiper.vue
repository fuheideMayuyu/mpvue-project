<template>
<!-- 轮播图组件 -->
    <swiper
      :style="{ width: width, height: height }"
      :indicator-dots="indicatorDots"
      :indicator-color="indicatorColor"
      circular="true"
      :indicator-active-color="indicatorActiveColor"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration">
      <block v-for="(item,index) in bannerList" :key="index">
        <swiper-item @click="toPageIndex(item)">
          <image :src="item.url" class="slide-image" lazy-load />
        </swiper-item>
      </block>
    </swiper>
</template>

<script>
export default {
  data (){
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000
    }
  },
  props: ['width', 'height', 'bannerList','indicatorActiveColor','indicatorColor'],
  methods: {
    toPageIndex (bannerData) {
      this.$emit('swiperHandle', bannerData)
    }
  }
}
</script>

<style scoped>
.slide-image{
  width: 100%;
}
</style>
