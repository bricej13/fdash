<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="ti-cloud"></i>
    </div>
    <div class="numbers" slot="content">
      <p>{{ $store.state.weather.current.text }}</p>
      {{ $store.state.weather.current.temp }} <span style="color:#AAA">{{ $store.state.weather.units.temperature }}</span>
    </div>
    <div class="stats" slot="footer">
      <i class="ti-location-pin"></i> {{ $store.state.weather.location }}
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
    }
  }
</script>

<style scoped>

</style>
