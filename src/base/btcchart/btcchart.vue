<template>
  <div>
    <div ref='chartwarp' class="chartwarp flex">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  // import { mapGetters } from 'vuex'
  import {PREFIX_URL, WEBSOCKT_URL} from 'api/config'
  const timevalue = 70000
  const INTERVAL = 60000
  const WINDOW_WIDTH = parseInt(document.body.clientWidth)
  const ECHRTS_POINTX = 0.774 * WINDOW_WIDTH
  const NEW_POINTX = 0.715 * WINDOW_WIDTH
  export default {
    data() {
      return {
        myChart: null,
        numlist: [],
        first: true,
        nowmax: Date.parse(new Date()) + timevalue,
        nowpoint: [],
        endpoint: [],
        color: [],
        xpoint: [],
        newColor: null,
        pointx: ECHRTS_POINTX,
      }
    },
    created() {
      this.$root.eventHub.$on('wxuser', () => {
        this._setwsuser()
      })
      this.$root.eventHub.$on('point', (point) => {
        if (point.nowpoint) {
          this.nowpoint.push(point.nowpoint)
          this.nowpoint = [...new Set(this.nowpoint)]
            // this.color.push(point.color)
          } else {
            this.nowpoint.shift()
          }
          if (point.endpoint) {
            this.endpoint.push(point.endpoint)
            this.nowpoint = [...new Set(this.endpoint)]
          } else {
            this.endpoint.shift()
          }
          if (point.color) {
            this.newColor = point.color;
            this.color.push(point.color);
            this.xpoint.push(point.xpoint);
          }
          if (this.color.length != this.nowpoint.length) {
            this.color.shift()
            this.xpoint.shift()
          }
          if(!this.color.length) {
            this.newColor = null;
          }
        })
      console.log('监听打点')
    },
    mounted() {
      const ws = new WebSocket(`wss://${WEBSOCKT_URL}/btc/line`);
      ws.onopen = () => {
        console.log('链接websockt')
      };
      ws.onmessage = (evt) => {
        // console.log(evt.data)
        let retevt = null
        try {
          retevt = JSON.parse(evt.data)
        } catch(err) {
          console.log(err);
        }
        if (!retevt) {
          return false
        }
        if (this.first) {
          let numlist = []
          retevt.forEach((res) => {
            // res.name = res.name.toFixed(2)
            numlist.unshift(res)
          })
          this.numlist = numlist
          this.nowmax = this.numlist[0].value[0] + timevalue
          this.first = null
          this._initChart()
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
        } else {
          let datalist = this.numlist
          datalist.unshift(retevt.data);
          if (this.newColor) {
            for(let i =0; i < 5; i++){
              // console.log(datalist[i].value[1], this.nowpoint[this.nowpoint.length - 1])
              if (datalist[i].value[1] == this.nowpoint[this.nowpoint.length - 1]) {
                console.log('循环找到')
                datalist[i].itemStyle = {
                  color: 'rgba(0,0,0,0)',
                  borderColor: this.newColor,
                  symbol: 'circle',
                  symbolSize: 10
                }
                break;
              }
            }
            this.newColor = null
          }
          if (datalist.length > 299) {
            datalist = datalist.slice(0, -60);
            this.pointx = NEW_POINTX;
            this.nowmax = datalist[0].value[0] + timevalue;
          }
          this.numlist = datalist
          let markPointdata = []
          if (this.nowpoint.length) {
            this.nowpoint.forEach((item, index) => {
              markPointdata.push({
                name: '',
                yAxis: item,
                xAxis: this.xpoint[index],
                itemStyle: {
                  color: this.color[index],
                  borderColor: this.color[index]
                },
                value: this.color[index] == '#ff3535' ? '涨' : '跌'
              })
            })
          }
          // if (this.endpoint.length) {
          //   // this.endpoint.forEach((item) => {
          //   //   this.myChart.dispatchAction({
          //   //     type: 'highlight',
          //   //     name: item
          //   //   })
          //   // })
          // }
          let dataOption = {
            data: this.numlist,
            markPoint: {
              symbol: 'pin',
              symbolSize: 20,
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderColor: 'red'
              },
              label: {
                show: true,
                fontSize: 8,
                color: '#fff'
              },
              data: markPointdata
            },
            animation: true,
            animationDurationUpdate: 0,
            animationEasingUpdate: 'circularIn'
          }
          if (this.nowpoint.length) {
            let linelist = []
            this.nowpoint.forEach((item, index) => {
              linelist.push({
                name: item,
                yAxis: item,
                lineStyle: {
                  color: this.color[index]
                }
              })
            })
            Object.assign(dataOption, {
              markLine: {
                silent: true,
                data : linelist,
                lineStyle: {
                  color: 'red',
                  type: 'dashed',
                },
                label: {
                  show: false
                },
                animation: true,
                animationDurationUpdate: 100,
                animationEasingUpdate: 'circularIn'
              }
            })
          } else {
            Object.assign(dataOption, {
              markLine: {
                silent: true,
                data : [{name: '平均线',type: 'average'}],
                lineStyle: {
                  color: 'rgba(0,0,0,0)',
                  type: 'dashed',
                },
                label: {
                  show: false
                },
              }
            })
          }
          this.myChart.setOption({series: [dataOption]});
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          // this.myChart.dispatchAction({
          //   type: 'highlight',
          //   name: this.numlist[0].name,
          //   seriesIndex: 0,
          //   dataIndex: 0
          // })
          // if (this.nowpoint.length) {
          //   this.nowpoint.forEach((item) => {
          //     this.myChart.dispatchAction({
          //       type: 'highlight',
          //       name: item
          //     })
          //   })
          // }
          // if (this.endpoint.length) {
          //   this.endpoint.forEach((item) => {
          //     this.myChart.dispatchAction({
          //       type: 'highlight',
          //       name: item
          //     })
          //   })
          // }
        }
      };
      ws.onclose = function(){ 
      };
    },
    computed: {
      // ...mapGetters([
      //   'user'
      //   ])
    },
    methods: {
      _setwsuser() {
        const wsuser = new WebSocket(`wss://${WEBSOCKT_URL}/user?username=${this.$root.user.username}`);
        wsuser.onmessage = (evt) => {
          // console.log(evt.data)
          let retevt = null
          try {
            retevt = JSON.parse(evt.data)
            console.log(retevt)
          } catch(err) {
            console.log(err);
          }
          this.$root.eventHub.$emit('result', retevt.data)
        }
      },
      _initChart() {
        this.$refs.chartwarp.style.width = WINDOW_WIDTH + 'px'
        this.myChart = echarts.init(this.$refs.chart);
        const that = this
        let option = {
          xAxis: {
            type: 'time',
            interval: INTERVAL,
            max: function(value) {
              return that.nowmax;
            },
            min: function(value) {
              return value.min;
            },
            splitLine: {
              show: true,
              lineStyle:{
                type: 'dashed',
                color: 'rgba(255,255,255,.2)'
              }
            },
            align: 'left',
            axisTick: {
              show: false
            },
            silent: true,
            axisLabel: {
              color: 'rgba(255,255,255,.75)',
              fontSize: 11
            },
            axisLine:{
              lineStyle:{
                color: 'rgba(255,255,255,.2)',
                type: 'dashed' 
              }
            },
          },
          yAxis: {
            type: 'value',
            max: function(value) {
              return parseInt(value.max + 100);
            },
            min: function(value) {
              return parseInt(value.min - 100);
            },
            silent: true,
            splitLine: {
              show: true,
              lineStyle:{
                type: 'dashed',
                color: 'rgba(255,255,255,.2)'
              }
            },
            axisPointer: {
              // handle: {
              //   show: true,
              //   margin: 0,
              //   size: 8,
              //   icon: 'image://https://cdn.xingkwh.com/cil.png',
              //   color: '#fff'
              // }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,.75)',
              fontSize: 8
            },
            axisLine:{
              lineStyle:{
                color: 'rgba(255,255,255,.2)',
                type: 'dashed' 
              }
            },
          },
          tooltip: {
            trigger: 'axis',
            triggerOn: 'none',
            renderMode: 'html',
            showContent: true,
            enterable: false,
            transitionDuration: 0,
            axisPointer: {
              animation: true,
              snap: true,
              type: 'line',
              axis: 'y',
              label: {
                show: false
              },
              lineStyle: {
                color: 'rgba(0,0,0,0)',
                type: 'dashed'
              }
            },
            textStyle: {
              fontSize: 11,
              width: '100%',
              height: '2px'
            },
            position: (point, params, dom, rect, size) => {
              this.pointx = point[0]
              return [0, point[1]];
            },
            // formatter: (params, ticket, callback) => {
            //   return params[0].name.toFixed(2)
            // },
            padding: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            extraCssText: 'transition: all .35s; width: 100%; height: 1px;',
            formatter: (params) => {
              return `<div class="tool-line"><div style="left: ${this.pointx}px" class="tool-num"><div class="tool-circle"></div>${params[0].name.toFixed(2)}</div>
              </div>`
            }
          },
          series: [{
            data: that.numlist,
            type: 'line',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 10,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",  // 会设置点和线的颜色，所以需要下面定制 line
                borderColor: "red"  // 点边线的颜色
              }
            },
            lineStyle: {
              color: 'rgba(255,255,255,.8)',
              width: 1
            },
            smooth: false
          }]
        };
        this.myChart.setOption(option);
      }
    },
    beforeDestroy () {
      this.myChart.clear()
    },
    components: {}
  }

</script>
<style type="text/css" scoped>
.chartwarp{
  width: 100%;
  margin: -40px 0 -20px 2.5%;
  position: relative;
  overflow: hidden;
}
.chartwarp:after{
  display: block;
  content: '';
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.chart{
 width: 100%;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 z-index: 999;
}
</style>
