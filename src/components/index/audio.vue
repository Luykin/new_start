<template>
  <transition name="list">
    <div class="header flex fw">
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-if="banner && banner.length">
        <swiper-slide class="swiper-item" v-for="item in banner" :key="item.id">
          <img :src="item.banner">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </transition>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import betterscroll from 'base/better-scroll/better-scroll'
  export default {
    data() {
      return{
        swiperOption: {
          direction: 'horizontal',
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 5000,
          },
          loop: true,
          on: {
            click: function(){
              vm._toNovelDetail(vm.banner[this.realIndex]);
            }
          },
        },
      }
    },
    name: 'audio',
    components: {
      betterscroll,
      swiper,
      swiperSlide,
    }
  }
</script>

<style scoped>

</style>
