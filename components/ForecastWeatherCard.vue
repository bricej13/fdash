<template>
  <chart-card :chart-data="$store.getters['weather/dailyChartData'].data" :chart-options="$store.getters['weather/dailyChartData'].options" :data-loaded="dataLoaded">
    <h4 slot="title" class="title">Weekly Forecast</h4>

    <span slot="subTitle">{{ $store.state.weather.daily.summary }}</span>

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
      dataLoaded() {
        return this.$store.state.weather.updated != null
      }
    },
  }
</script>

<style scoped>

</style>
