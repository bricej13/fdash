<template>
  <widget-card>

    <template slot="title">Weekly Forecast</template>

    <template slot="content">
      <chart :chart-data="chartConfig.data" :chart-options="chartConfig.options" :data-loaded="dataLoaded" aspect-ratio="ct-double-octave"></chart>

    </template>

    <template slot="footer" v-if="!editable">
      <div class="card-footer-item has-text-grey">
        <i class=""></i> {{ ($store.state.weather.daily || $store.state.weather.hourly).summary }}
      </div>
    </template>

  </widget-card>

</template>

<script>
  import ChartCard from '~/components/UIComponents/Cards/ChartCard.vue'
  import Chart from '~/components/Chart.vue'
  import WidgetCard from '~/components/WidgetCard'

  export default {
    name: "ForecastWeatherCard",
    components: {ChartCard, WidgetCard, Chart},
    data: function () {
      return {
        editable: false
      }
    },
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
