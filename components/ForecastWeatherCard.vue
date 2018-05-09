<template>
  <chart-card :chart-data="chartForecast.data" :chart-options="chartForecast.options" :data-loaded="dataLoaded">
    <h4 slot="title" class="title">Weekly Forecast</h4>

    <span slot="subTitle">{{ $store.state.weather.location }}</span>

    <div slot="legend">
      <i class="fa fa-circle text-warning"></i> High
      <i class="fa fa-circle text-info"></i> Low
      <i class="fa fa-circle text-danger"></i> Current
    </div>

    <span slot="footer">
      <i class="ti-reload"></i> {{ $store.state.weather.updated }}
    </span>

  </chart-card>
</template>

<script>
  import ChartCard from '~/components/UIComponents/Cards/ChartCard.vue'

  export default {
    name: "ForecastWeatherCard",
    components: {ChartCard},
    computed: {
      chartForecast() {
        const labels = this.$store.state.weather.forecast.map(d => d.day)
        const highs = this.$store.state.weather.forecast.map(d => d.high)
        const lows = this.$store.state.weather.forecast.map(d => d.low)
        return {
          data: {
            labels: labels,
            series: [lows, highs, [this.$store.state.weather.current.temp]]
          },
          options: {}
        }
      },
      dataLoaded() {
        return this.$store.state.weather.updated != null
      }
    },
    created: function () {
      setInterval(function() {
        this.$store.dispatch('weather/load');
      }, 21600000)
    }
  }
</script>

<style scoped>

</style>
