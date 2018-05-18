<template>
  <bulma-card>
    <template slot="title">Current Weather</template>
    <template slot="titleIcon">
      <span @click="editable=true" :disabled="editable" class="mdi mdi-pencil"></span>
    </template>

    <template slot="content">

      <div class="columns" v-if="!editable">

        <div class="column is-two-thirds">
          <div class="is-size-1">
            <i class="wi" :class="weatherIcon"></i>
          </div>
          <div class="is-size-4">
            {{ $store.state.weather.current.summary }}
          </div>
        </div>

        <div class="column has-text-right is-size-1">
          {{ $store.state.weather.current.temperature | round }}<span class="is-size-4 has-text-grey"> F</span>
        </div>

        <b-loading :is-full-page="false" :active="loading" :canCancel="false"></b-loading>
      </div>

      <div class="config" v-if="editable">
        <div class="field">
          <label class="label" for="currentWeatherLat">Latitude</label>
          <input type="number" class="input" id="currentWeatherLat" placeholder="lat"
                 v-model="local_lat">
        </div>

        <div class="field">
          <label class="label" for="currentWeatherLong">Longitude</label>
          <input type="number" class="input" id="currentWeatherLong" placeholder="long" v-model="local_long">
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="saveChanges">Done</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="editable = false">Cancel</button>
          </div>
        </div>

      </div>
    </template>


    <template slot="footer">
      <div class="card-footer-item has-text-grey">
        <i class=""></i> {{ ($store.state.weather.minutely || $store.state.weather.hourly).summary }}
      </div>
    </template>

  </bulma-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import BulmaCard from '~/components/UIComponents/Cards/BulmaCard.vue'

  export default {
    name: "CurrentWeatherCard",
    components: {StatsCard, BulmaCard},
    props: {
      lat: {type: Number},
      long: {type: Number}
    },
    data: function () {
      return {
        local_lat: this.lat,
        local_long: this.long,
        editable: false
      }
    },
    created: function () {
      if (this.lat && this.long) {
        this.loadWeather(this.lat, this.long);
      } else {
        this.editable = true
      }
    },
    computed: {
      loading() {
        return !this.$store.state.weather.current
      },
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
    methods: {
      saveChanges() {
        this.editable = false;
        this.$emit('config-changes', {
          lat: Number(this.local_lat),
          long: Number(this.local_long)
        });
        this.loadWeather(this.local_lat, this.local_long);
      },
      loadWeather(lat, long) {
        this.$store.dispatch('weather/load', {lat: lat, long: long});
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
