<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="ti-pulse"></i>
    </div>
    <div class="numbers" slot="content" v-if="$store.state.strava.updated">
      <p>Distance to Date</p>
      {{ $store.getters['strava/weeklyDistanceSummary'].Run | mToMi }} <span style="color:#AAA">mi</span>
    </div>
    <div class="stats" slot="footer">
      <i class="ti-reload"></i> Updated {{ $store.state.strava.updated }}
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "StravaCard",
    components: {StatsCard},
    created: function () {
      this.$store.dispatch('strava/load');
      setInterval(function() {
        this.$store.dispatch('strava/load');
      }, 600000) // 10 minutes
    },
    filters: {
      mToMi: function (value) {
        if (!value) return '';
        return Math.round(value / 16.0934) / 100
      }
    }
  }
</script>

<style scoped>

</style>
