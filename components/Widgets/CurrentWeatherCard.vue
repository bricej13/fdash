<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="wi" :class="weatherIcon"></i>
    </div>
    <div class="numbers" slot="content">
      <p>{{ $store.state.weather.current.summary }}</p>
      {{ $store.state.weather.current.temperature | round }} <span style="color:#AAA">F</span>

    </div>

    <div slot="subContent">
      <div class="alert alert-info" v-for="alert in alerts" :key="alert.time" style="max-height: 300px; overflow: hidden;">
        <h4><b>{{ alert.severity }}: </b>{{ alert.title }}</h4>
        <p>{{ alert.description}}</p>
      </div>
    </div>

    <div class="stats" slot="footer">
      <i class="ti-light-bulb"></i> {{ $store.state.weather.minutely.summary }}
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "CurrentWeatherCard",
    components: {StatsCard},
    props: {
      lat: { type: Number },
      long: { type: Number }
    },
    created: function () {
      this.$store.dispatch('weather/load');
    },
    computed: {
      alerts() {
        return this.$store.state.weather.alerts;
      },
      weatherIcon() {
        switch (this.$store.state.weather.current.icon) {
          case 'rain':
            return 'wi-rain';
          case 'snow':
            return 'wi-snow';
          case 'sleet':
            return 'wi-sleet';
          case 'wind':
            return 'wi-strong-wind';
          case 'fog':
            return 'wi-fog';
          case 'cloudy':
            return 'wi-cloudy';
          case 'clear-day':
            return 'wi-day-sunny';
          case 'clear-night':
            return 'wi-night-cloudy';
          case 'partly-cloudy-day':
            return 'wi-day-cloudy';
          case 'partly-cloudy-night':
            return 'wi-night-cloudy';
          default:
            return 'na'
        }
      }
    },
    filters: {
      round(val) {
        return Math.floor(val)
      }
    }
  }
</script>

<style scoped>

</style>
