<template>
  <chart-card :chart-data="chartConfig.data" :chart-options="chartConfig.options" :data-loaded="dataLoaded">
    <h4 slot="title" class="title">Weekly Forecast</h4>

    <span slot="subTitle">{{ $store.state.weather.daily.summary }}</span>

    <div slot="legend">
      <i class="fa fa-circle text-danger"></i> High
      <i class="fa fa-circle text-warning"></i> Low
      <i class="fa fa-circle text-success"></i> Current
      <i class="fa fa-circle text-info"></i> Precipitation %
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
      },
      chartConfig() {
        return this.$store.getters['weather/dailyChartData'];
      }
    },
  }
</script>

<style scoped>

</style>
