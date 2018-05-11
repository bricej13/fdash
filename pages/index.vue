<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <river-level-card></river-level-card>
      </div>
      <div class="col-lg-4 col-sm-6">
        <strava-card></strava-card>
      </div>
    </div>


    <div class="row">
      <div class="col-lg-3 col-sm-12">
        <current-weather-card></current-weather-card>
      </div>
      <div class="col-lg-9 col-sm-12">
        <forecast-weather-card></forecast-weather-card>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <calendar-card></calendar-card>
      </div>
    </div>

  </div>
</template>
<script>

  import RiverLevelCard from '~/components/RiverLevelCard.vue'
  import CurrentWeatherCard from '~/components/CurrentWeatherCard.vue'
  import ForecastWeatherCard from '~/components/ForecastWeatherCard.vue'
  import CalendarCard from '~/components/CalendarCard.vue'
  import StravaCard from '~/components/StravaCard.vue'

  let Chartist;
  if (process.client) {
    Chartist = require('chartist')
  }
  export default {
    layout: "dashboard",
    components: {
      RiverLevelCard,
      CurrentWeatherCard,
      ForecastWeatherCard,
      CalendarCard,
      StravaCard
    },
    data() {
      return {}
    },
  }

</script>
<style>

</style>
