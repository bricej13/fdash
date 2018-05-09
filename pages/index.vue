<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <river-level-card></river-level-card>
      </div>
      <div class="col-lg-3 col-sm-6">
        <current-weather-card></current-weather-card>
      </div>
    </div>

    <!--Charts-->
      <div class="row">


      </div>
  </div>
</template>
<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from '~/components/UIComponents/Cards/ChartCard.vue'

  import RiverLevelCard from '~/components/RiverLevelCard.vue'
  import CurrentWeatherCard from '~/components/CurrentWeatherCard.vue'

  let Chartist;
  if(process.client){
    Chartist = require('chartist')
  }
  export default {
    layout: "dashboard",
    components: {
      StatsCard,
      ChartCard,
      RiverLevelCard,
      CurrentWeatherCard
    },
    data () {
      return {}
    },
  }

</script>
<style>

</style>
