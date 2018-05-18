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
                 v-model.number="lat">
        </div>

        <div class="field">
          <label class="label" for="currentWeatherLong">Longitude</label>
          <input type="number" class="input" id="currentWeatherLong" placeholder="long" v-model.number="long">
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="saveChanges" :disabled="!lat || !long">Done</button>
          </div>
          <div class="control" v-if="!firstTimeSetup">
            <button class="button is-text" @click.prevent="cancelChanges">Cancel</button>
          </div>
        </div>

      </div>
    </template>


    <template slot="footer" v-if="!editable">
      <div class="card-footer-item has-text-grey">
        <i class=""></i> {{ ($store.state.weather.minutely || $store.state.weather.hourly).summary }}
      </div>
    </template>

  </bulma-card>
</template>

<script>
  import BulmaCard from '~/components/UIComponents/Cards/BulmaCard.vue'

  export default {
    name: "CurrentWeatherCard",
    components: {BulmaCard},
    data: function () {
      return {
        lat: null,
        long: null,
        editable: false,
        firstTimeSetup: false
      }
    },
    created: function () {
      let config = JSON.parse(localStorage.getItem('weatherConfig'));

      if (config && config.lat && config.long) {
        this.lat = config.lat;
        this.long = config.long;
        this.loadWeather();
      }
      else {
        this.editable = true;
        this.firstTimeSetup = true;
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
        localStorage.setItem('weatherConfig', JSON.stringify({
          lat: this.lat,
          long:this.long
        }));
        this.editable = false;
        this.loadWeather();

      },
      cancelChanges() {
        let config = JSON.parse(localStorage.getItem('weatherConfig'));
        this.lat = config.lat;
        this.long = config.long;
        this.editable = false;
      },
      loadWeather() {
        this.$store.dispatch('weather/load', {lat: this.lat, long: this.long});
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
