<template>
  <div>
    <interlayer ref="interlayer"></interlayer>
    <popup ref="popup">
      <div class="popup-report">
        <!--<h1 class="flex pop-title">审核不通过</h1>-->
        <span class="describe">对不起,您当前的余额不足</span>
        <div class="pop-btn-warp flex">
          <div class="flex pop-btn back-f8" @click="_close">取消</div>
          <div class="flex pop-btn line-back" @click="_toGoods">立即充值</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import popup from 'base/popup/popup'
  import interlayer from 'base/interlayer/interlayer'
  export default {
    name: 'not-funds',
    methods: {
      _close() {
        this.$refs.interlayer._hiddenLayer()
        this.$refs.popup._hiddenPopup()
      },
      _show() {
        this.$refs.interlayer._showLayer()
        this.$refs.popup._showPopup()
      },
      _toGoods() {
        this.$router.push({
          path: './good'
        })
        this._close()
      },
    },
    components: {
      popup,
      interlayer
    }
  }
</script>

<style scoped>
  .popup-report {
    width: 80%;
    padding: 4% 4% 70px 4%;
    min-height: 50px;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
  }

  .describe {
    display: block;
    width: 90%;
    line-height: 50px;
    margin: 0 auto;
    color: #6B41E1;
    font-weight: 900;
    font-size: 16px;
    text-align: center;
  }

  .pop-btn-warp {
    /*height: 50px;*/
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*background: red;*/
    height: 50px;
    /*border-radius: 8px;*/
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
  }

  .pop-btn {
    height: 100%;
    color: #fff;
  }

  .back-f8 {
    background: #f8f8f8;
    color: #333;
  }
</style>
