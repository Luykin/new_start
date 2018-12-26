<template>
  <transition name="list">
    <div>
      <betterscroll class="all-warp" ref='wrapper' @pulldown="_pulldown" @scrollToEnd="_scrollToEnd">
        <div>
          <div class="header flex fw">
            <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-if="banner && banner.length">
              <swiper-slide class="swiper-item" v-for="item in banner" :key="item.id">
                <img :src="item.banner">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="explain-warp flex js lll mg10">抖音热门课程</div>
          <div class="secret-item flex js" v-if="list.length" v-for="item in list" :key="id" @click="_setprice(item)">
            <img :src="item.icon"/>
            <div class="flex secret-item-right fw">
              <h1 class="flex ll js">{{item.title}}</h1>
              <div class="ss popular">{{item.popular}}人气</div>
              <div class="price flex">{{item.is_view_by_agent ? '合伙人免费' : item.is_buy ? '已购买' : parseFloat(item.price) +
                '元'}}
              </div>
            </div>
          </div>
        </div>
      </betterscroll>
      <router-view></router-view>
      <coursebuy ref="courseBuy" :course_id="course_id" :price="price" @success="_pulldown"></coursebuy>
    </div>
  </transition>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import betterscroll from 'base/better-scroll/better-scroll'
  import {course_list} from 'api/index'
  import coursebuy from 'components/couse-buy/buy'

  let vm = null
  export default {
    data() {
      return {
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
            click: function () {
              vm._toNovelDetail(vm.banner[this.realIndex])
            }
          },
        },
        banner: [],
        list: [],
        total: 0,
        page: 0,
        num: 10,
        course_id: -1,
        price: 0
      }
    },
    created() {
      vm = this
      this._init()
      this.$root.eventHub.$on('courseBuy', () => {
        this.$refs.courseBuy._show()
      })
    },
    mounted() {
      this.$refs.wrapper._initScroll()
    },
    methods: {
      _toNovelDetail(item) {
        if (!this.$root.user.is_agent) {
          this.$root.eventHub.$emit('titps', '您还未成为合伙人')
          return false
        }
        if (!item || !item.id) {
          return false
        }
        this.$router.push({
          path: `./audio/${item.id}`
        })
      },
      _setprice(item) {
        this.course_id = item.id
        this.price = item.price
        this._toNovelDetail(item)
      },
      _init() {
        this._getCourseList()
      },
      async _getCourseList() {
        this.$root.eventHub.$emit('loading', true)
        const ret = await course_list(this.$root.user.user_id, this.page, this.num)
        this.$root.eventHub.$emit('loading', null)
        if (ret.status === 200 && ret.data.code === 200) {
          if (ret.data.data.count) {
            if (!this.banner.length) {
              this.banner = [...ret.data.data.ret.slice(0, 2)]
            }
            this.list = [...this.list, ...ret.data.data.ret]
            this.total = ret.data.data.count
          }
        }
      },
      _pulldown() {
        this.num = 10
        this.page = 0
        this.list = []
        this._getCourseList()
      },
      _scrollToEnd() {
        if (this.list.length < this.totle) {
          this.page += 1
          this._getCourseList()
        }
      }
    },
    name: 'audio',
    components: {
      coursebuy,
      betterscroll,
      swiper,
      swiperSlide,
    }
  }
</script>

<style scoped>

  .novel-all-warp {
    position: fixed;
    top: 0;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .header {
    width: 100%;
    height: auto;
    overflow: hidden;
    /*background: #1F222C;*/
  }

  .swiper-box {
    width: 96%;
    height: 170px;
    border-radius: 8px;
    margin: 10px auto;
  }

  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-item img {
    width: 100%;
    height: 100%;
  }

  .secret-item {
    width: 88%;
    padding: 10px 2%;
    height: 100px;
    border-radius: 10px;
    margin: 10px auto;
    color: #fff;
    background: #424262;
    overflow: hidden;
  }

  .secret-item img {
    width: 120px;
    height: 100px;
    border-radius: 8px;
  }

  .secret-item-right {
    flex-grow: 1;
    align-items: flex-start;
    align-content: flex-start;
    height: 100%;
    position: relative;
  }

  .secret-item-right h1 {
    margin: 5px 1% 0 5%;
    line-height: 24px;
  }

  .secret-item-right .price {
    position: absolute;
    right: 2%;
    bottom: 2%;
    width: auto;
    min-width: 45px;
    max-width: 62px;
    padding: 0 5px;
    height: 24px;
    font-size: 10px;
    border-radius: 4px;
    background: #FFE15A;
    color: #816D11;
    white-space: nowrap;
  }

  .secret-item-right .popular {
    position: absolute;
    left: 5%;
    bottom: 5%;
  }
</style>
