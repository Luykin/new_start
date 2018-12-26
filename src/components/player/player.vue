<template>
  <div class="player flex js" v-show="currentSong">
    <div class="close-warp flex" @click="_stop">
      <img src="https://cdn.xingkwh.com/%E9%9F%B3%E9%A2%91%E5%85%B3%E9%97%AD@3x.png" class="close-img"/>
    </div>
    <div class="man-warp flex fw">
      <div v-if="currentSong">{{currentSong.title}}</div>
      <div class="planned" @click="_progressClick($event)">
            <span class="planned-bg" ref="planned">
              <span class="has-played" style="width:0%" ref="played">
              <i ref="playedIcon" class="planned-icon"
                 style="transform: translate3d(0,-50%,0);"></i>
                <!--@touchstart.stop.prevent="_touchStart($event)"-->
                <!--@touchmove.stop.prevent="_touchMove($event)" @touchend.stop.prevent="_touchEnd($event)"-->
            </span>
          </span>
      </div>
    </div>
    <div class="start-btn flex" @click="_changePlayStatus">
      <img src="https://cdn.xingkwh.com/%E9%9F%B3%E9%A2%91%E6%92%AD%E6%94%BE@3x.png" class="start-img"
           v-show="!playing" :class="{'disable-btn': readyOk}"/>
      <img src="https://cdn.xingkwh.com/%E9%9F%B3%E9%A2%91%E6%9A%82%E5%81%9C@3x.png" class="start-img"
           v-show="playing" :class="{'disable-btn': readyOk}"/>
    </div>
    <audio :src="currentUrl" ref="audio" @canplay="_ready" @error="_error" @timeupdate="_updateTime"
           @ended="_next"></audio>
  </div>
</template>

<script>
  const DOT_HALF_WIDTH = 10
  export default {
    props: {
      currentIndex: {
        type: [Number],
        default: -1
      },
      playList: {
        type: [Array],
        default: []
      }
    },
    data() {
      return {
        readyOk: null,
        initiated: null,
        currentTime: 0,
        currentUrl: '',
        currentSong: null,
        playing: null,
        duration: 0,
        plannedW: -1
      }
    },
    name: 'player',
    mounted() {
      // this._init()
    },
    methods: {
      weixinPlay(fn) {
        if (!this.isWx()) {
          fn()
          return false
        }
        if (window.WeixinJSBridge) {
          WeixinJSBridge.invoke('getNetworkType', {}, fn)   // 这句话是在微信中可以自动播放的核心
        } else {
          document.addEventListener('WeixinJSBridgeReady', function () {
            WeixinJSBridge.invoke('getNetworkType', {}, fn)
          })
        }
      },
      isWx() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && navigator.userAgent.indexOf('MicroMessenger') > -1
      },
      _init() {
        this.$nextTick(() => {
          this.plannedW = this.$refs.planned.clientWidth
          this.playedIcon = this.$refs.playedIcon
          this.played = this.$refs.played
        })
        // this.palyerMiddelH = parseInt(this.$refs.palyerMiddel.clientHeight)
        // this.palyerMiddelW = parseInt(this.$refs.palyerMiddel.clientWidth)
      },
      _ready() {
        this.weixinPlay(() => {
          this.readyOk = true
          this.duration = this.$refs.audio.duration
          this.$refs.audio.play()
          this.playing = true
        })
      },
      _error() {
        this.readyOk = true
      },
      _updateTime(e) {
        // console.log(e)
        this.currentTime = e.target.currentTime
      },
      _next() {
      },
      _stop() {
        this.$refs.audio.pause()
        this.currentUrl = ''
        this.duration = 0
        this.$emit('normalIndex')
        this.currentSong = null
      },
      _changePlayStatus() {
        if (!this.readyOk) {
          return
        }
        const audio = this.$refs.audio
        if (this.playing) {
          audio.pause()
        } else {
          this.weixinPlay(() => {
            audio.play()
          })
        }
        this.playing = !this.playing
      },
      _changeLength() {
        console.log(this.currentTime, this.duration, this.plannedW)
        this._setOffet(this.currentTime / this.duration * this.plannedW)
      },
      _setOffet(offset) {
        this.playedIcon.style.transform = `translate3d(${offset - DOT_HALF_WIDTH}px,-50%,0)`
        this.played.style.width = `${offset}px`
      },
      _progressClick(e) {
        const offset = e.offsetX - DOT_HALF_WIDTH
        this._setOffet(offset)
        this._triggrPercent()
      },
      _triggrPercent() {
        let nowX = this.played.clientWidth
        this.$refs.audio.currentTime = this.duration * (nowX / this.plannedW)
        if (!this.playing) {
          this._changePlayStatus()
        }
      },
    },
    watch: {
      currentIndex(newIndex, oldIndex) {
        if (newIndex >= this.playList.length) {
          return
        }
        if (newIndex > -1) {
          this.currentTime = 0
          this.currentUrl = this.playList[newIndex].voice_url
          this.currentSong = this.playList[newIndex]
        }
        if (this.plannedW < 0) {
          this._init()
        }
      },
      currentTime() {
        if (this.plannedW < 0) {
          return
        }
        window.requestAnimationFrame(() => {
          this._changeLength()
        })
      }
    },
  }
</script>

<style scoped>
  .player {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    background: #8888BE;
  }

  .planned {
    width: 90%;
    height: 20px;
    margin: 0 auto -6px;
  }

  .planned-bg {
    display: inline-block;
    width: 100%;
    height: 4px;
    margin: 8px auto;
    background: #B5B5DD;
    position: relative;
  }

  .man-warp {
    width: 70%;
    height: 100%;
  }

  .close-img {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }

  .start-img {
    width: 30px;
    height: 30px;
  }

  .close-warp {
    width: 12%;
    height: 100%;
  }

  .start-btn {
    width: 18%;
    height: 100%;
  }

  .planned-icon {
    position: absolute;
    left: 0;
    top: 50%;
    display: inline-block;
    line-height: 0;
    width: 10px;
    height: 10px;
    box-shadow: 0 0 6px #ffdd65;
    border-radius: 100px;
    background: #ffcd32;
  }

  .has-played {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    height: 4px;
    background: #ffcd32;
  }

  .disable-btn {
    filter: grayscale(100%);
  }
</style>
