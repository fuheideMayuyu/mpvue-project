<template>
  <!-- 首页 -->
  <view class="content">
    <!-- 首页顶部轮播 -->
    <m-swiper
      :bannerList="bannerList"
      indicatorColor='#fff'
      indicatorActiveColor='#f00'
      width="100%"
      height="356rpx"
      @swiperHandle='swiperHandle'>
    </m-swiper>
    <view class="head">
      <image class="head-img" @click="goPage()" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555057949670&di=2b1cdbc8557d4f15dbbf6cbb9329a4ba&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201207%2F12%2F20120712215350_P23hy.jpeg">
      </image>
    </view>
    <!-- 优惠券模块 -->
    <view></view>
    <!-- 商品推荐模块 -->
    <view class="goods-recommend">
      <view class="goods-recommend-head">
        <image class="goods-recommend-img" @click="_goPage()" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555057949670&di=2b1cdbc8557d4f15dbbf6cbb9329a4ba&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201207%2F12%2F20120712215350_P23hy.jpeg">
        </image>
      </view>
      <view class="goods-recommend-content">
      <view class="item" v-for="(item,index) in recommendGoodsList" :key="index">
        <view class="item-img">
          <image class="img" :src="item.goodImg">

          </image>
        </view>
        <view class="item-title text-cut">{{item.goodTitle}}</view>
        <view class="item-good-info text-cut">{{item.goodName}}</view>
        <view class="item-good-info text-cut item-price">
          <text class="item-good-price">{{item.goodPric}}</text>
          <text>日元</text>
          <text>(约{{item.goodRNBPrice}}元)</text>
        </view>
      </view>
      </view>
    </view>
    <!-- 中部轮播图 -->
    <m-swiper
      :bannerList="bannerList"
      indicatorColor='#fff'
      indicatorActiveColor='#f00'
      width="100%"
      height="240rpx"
      @swiperHandle='swiperHandle'>
    </m-swiper>
    <!-- 商品导航模块 -->
    <div class="nav-bar sticky">
        <scroll-view class="scroll-view_x" scroll-x="true" @scroll="scrollLeftFun">
          <view class="tag"
            v-for="(item, index) in classList" :key="index"
            :class="{ active:index==isActive }"
            @click="checkItem(index)">
            {{item.fclassificationName}}
          </view>
        </scroll-view>
      </div>
    <!-- 主商品模块 -->
    <!-- <view class="good-content">
      <view class="item" v-for="(item, index) in goodList" :key="index" @click="goGoodDetail()">
        <view class="item-img-box">
          <image class="img" :src="item.img"></image>
        </view>
        <view class="item-text-box a" v-if="item.recommend == false">
          aaaasdsadsadddddddddddd
          ddddddddddddddddddddddddd
          ddddddddddddddddddddsad
          dasdasdasssssssssssssss
          ssssssssssssssssssss
          ssssssssss
          dsadasdasda
        </view>
        <view class="item-text-box b" v-if="item.recommend == true">
          bbb
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
  import swiper from '@/components/swiper'
  export default {
    data () {
      return {
        isActive:false,
        bannerList: [
          {
            url:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            key:1
          },
          {
            url:'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
            key:2
          },
          {
            url:'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            key:3
          }
        ],
        recommendGoodsList:[
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555',
            goodRNBPrice:'35.95'
          },
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555111',
            goodRNBPrice:'35.95'
          },
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555',
            goodRNBPrice:'35.95'
          },
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555',
            goodRNBPrice:'35.95'
          },
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555',
            goodRNBPrice:'35.95'
          },
          {
            goodImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555060482935&di=ee6630ba1ac68149b5b86a119be5e35f&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F8c3148a77c19312b08534ffd17ebf60f6b376e4b.jpg',
            goodTitle:'雪肌精雪肌精雪肌精雪肌精雪肌精',
            goodName:'石泽研究所石泽研究所石泽研究所石泽研究所石泽研究所',
            goodPric:'555',
            goodRNBPrice:'35.95'
          }
        ],
        classList:[
          {fclassificationName:'全部'},
          {fclassificationName:'香水彩妆'},
          {fclassificationName:'香水彩妆'},
          {fclassificationName:'香水彩妆'},
          {fclassificationName:'香水彩妆'},
          {fclassificationName:'香水彩妆'},
        ],
        goodList:[
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:false,
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:true,
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:true,
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:false,
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:true,
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=615770551,1161070041&fm=26&gp=0.jpg',
            title:'雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精雪肌精',
            Brand:'KOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSEKOSE',
            price:55555,
            priceRMB:32.12,
            discount:75,
            Avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555069804060&di=c462583c91e2e349161fa4d3fe01c8f9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F12%2F20181012224238_enfwb.jpg',
            name: '主理店长',
            Introduction:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            recommend:false,
          }
        ]
      }
    },
    computed: {},
    components: {
      'm-swiper': swiper,
    },
    mounted () {},
    onLoad (options) {},
    onShow () {
      wx.setNavigationBarTitle({
        title: wx.getExtConfigSync().name
      })
      this.init()
    },
    onUnload () {
    },
    onPullDownRefresh () {},
    // 上拉加载
    onReachBottom () {},
    methods: {
      init(){

      },
      swiperHandle(val){
        console.log('do something')
      },
      goPage(){
        console.log('go Page')
      },
      checkItem(index){
        this.isActive = index
      },
      scrollLeftFun(e){
        console.log(e)
      },
      goGoodDetail(){

      }
    }
  }
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  min-height: 100vh;
  background: $backGroundColor;
  .head{
    display: flex;
    flex-wrap:wrap;
    .head-img{
      width: 100%;
      height: 96rpx;
    }
  }
  .goods-recommend{
    background: #fff;
    margin: 20rpx 0;
    box-sizing: border-box;
    padding: 0 25rpx 30rpx 25rpx;
    .goods-recommend-head{
      height: 116rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .goods-recommend-img{
        width: 192rpx;
        height: 56rpx;
      }
    }
    .goods-recommend-content{
      height: 648rpx;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .item{
        width: 228rpx;
        height: 320rpx;
        box-sizing: border-box;
        padding: 20rpx;
        margin-bottom: 8rpx;
        border: 1rpx solid #DBDBDB;
        .item-img{
          display: flex;
          align-items: center;
          justify-content: center;
          .img{
            width: 160rpx;
            height: 160rpx;
          }
        }
        .item-title{
          width: 188rpx;
          font-size: 24rpx;
          color:#14151A;
          margin-top: 12rpx;
        }
        .item-good-info{
          width: 188rpx;
          font-size: 20rpx;
          color:$grayFontColor;
          margin-top: 16rpx;
          .item-good-price{
            font-size: 24rpx;
            color:$priceColor;
          }
        }
        .item-price{
          margin-top: 0;
        }
      }
      .item:nth-child(2){
        margin: 0 8rpx 8rpx 8rpx;
      }
      .item:nth-child(5){
        margin: 0 8rpx 8rpx 8rpx;
      }
    }
  }
  .nav-bar{
    background: #fff;
    height: 88rpx;
    line-height: 88rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    .scroll-view_x {
      text-align: center;
      white-space: nowrap;
      .tag{
        display: inline-block;
        margin-right: 40rpx;
        text-align: center;
        height: 100%;
        box-sizing: border-box;
      }
      .tag:last-child{
        margin-left: 0;
      }
      .active{
        box-sizing: border-box;
        color: $themeColor;
        border-bottom: 4rpx solid $themeColor;
      }
    }
  }
  .sticky{
    position: -webkit-sticky;
    position: sticky;
    // top: 1526rpx;
  }
  .good-content{
    box-sizing: border-box;
    padding: 25rpx;
    column-count: 2; 
    column-gap: 0;

    .item{
      background: red;
      width: 340rpx;
      display: inline-block;
      margin-bottom: 20rpx;
      break-inside: avoid; 
      box-sizing: border-box; 
      padding: 10px;
      

      .item-img-box{
        height: 370rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .img{
          width: 260rpx;
          height: 260rpx;
        }
      }
      .item-text-box{
        width: 250rpx;
      }
      .a{
        background: yellow;
      }
      .b{
        background: green;
      }
    }
    .item:nth-child(2n){
      margin-left: 20rpx;
    }
  }
}
</style>
