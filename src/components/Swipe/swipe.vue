<template>
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
            <img :src="item.url" alt="" :title="item.id">
        </div>
        <br>
    </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'swipe',
  data() {
    return {

    }
  },
  props: {
    bannerList: {
      type: Array,
      default: () => [
        { id: 0, url: require('@/assets/img/xb.jpg') },
        { id: 2, url: require('@/assets/img/xb.jpg') },
        { id: 3, url: require('@/assets/img/xb.jpg') },
      ]
    },
    bannerOption: {
      type: Object,
      default() {
        return {
          direction: 'horizontal', // 水平切换选项
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

          // 如果需要滚动条
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        }
      }
    }
  },
  methods: {
    bannerInit() {
      new Swiper(
        eval(this.bannerOption)
      )
    }
  },
  mounted() {
    this.bannerInit()
    console.log(this.bannerOption)
  }
}
</script>

<style lang="less">
    @import "~swiper/css/swiper.min.css";
</style>