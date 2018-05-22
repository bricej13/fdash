<template>
  <div :id="chartId" class="ct-chart" :class="[aspectRatio]"></div>
</template>
<script>
  export default {
    name: 'chart',
    props: {
      footerText: {
        type: String,
        default: ''
      },
      headerTitle: {
        type: String,
        default: 'Chart title'
      },
      dataLoaded: {
        type: Boolean,
        default: true
      },
      chartType: {
        type: String,
        default: 'Line' // Line | Pie | Bar
      },
      aspectRatio:  {
        type: String,
        default: ''
      },
      chartOptions: {
        type: Object,
        default: () => {
          return {}
        }
      },
      chartData: {
        type: Object,
        default: () => {
          return {
            labels: [],
            series: []
          }
        }
      }
    },
    data() {
      return {
        chartId: 'no-id'
      }
    },
    methods: {
      /***
       * Initializes the chart by merging the chart options sent via props and the default chart options
       */
      initChart() {
        let chartIdQuery = `#${this.chartId}`;
        this.$Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions)
      },
      /***
       * Assigns a random id to the chart
       */
      updateChartId() {
        let currentTime = new Date().getTime().toString();
        let randomInt = this.getRandomInt(0, currentTime);
        this.chartId = `div_${randomInt}`
      },
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    },
    watch: {
      dataLoaded: {
        immediate: true,
        handler: function (val) {
          if (val && process.client) {
            this.updateChartId();
            this.$nextTick(this.initChart)
          }
        }
      }
    }
  }

</script>
<style>

</style>
