<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <river-level-card></river-level-card>
      </div>
    </div>

    <!--Charts-->
      <div class="row">


      </div>
  </div>
</template>
<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import RiverLevelCard from '~/components/RiverLevelCard.vue'
  import ChartCard from '~/components/UIComponents/Cards/ChartCard.vue'
  let Chartist;
  if(process.client){
    Chartist = require('chartist')
  }
  export default {
    layout: "dashboard",
    components: {
      StatsCard,
      ChartCard,
      RiverLevelCard
    },
    data () {
      return {}
    },
  }

</script>
<style>

</style>
