<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="ti-cloud"></i>
    </div>
    <div class="numbers" slot="content">
      <p>{{ $store.state.weather.current.summary }}</p>
      {{ $store.state.weather.current.temperature }} <span style="color:#AAA">F</span>
    </div>
    <div class="stats" slot="footer">
      <i class="ti-light-bulb"></i> {{ $store.state.weather.minutely.summary  }}
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "CurrentWeatherCard",
    components: {StatsCard},
    created: function () {
      this.$store.dispatch('weather/load');
      setInterval(function() {
        this.$store.dispatch('weather/load');
      }, 900000)
    }
  }
</script>

<style scoped>

</style>
