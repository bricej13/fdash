<template>
  <div>
    <header class="navbar is-primary header" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4">
          Dashboard
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            {{currentDate | formatDate}}
          </div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <div class="columns">
        <div class="column">
          <no-ssr>
            <RiverLevelCard></RiverLevelCard>
          </no-ssr>
        </div>
        <div class="column">
          <no-ssr>
            <CurrentWeatherCard></CurrentWeatherCard>
          </no-ssr>
        </div>
        <div class="column">
          <no-ssr>
            <StravaCard></StravaCard>
          </no-ssr>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <no-ssr>
            <CalendarCard></CalendarCard>
          </no-ssr>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <no-ssr>
            <PlanesOverheadCard></PlanesOverheadCard>
          </no-ssr>
        </div>
        <div class="column">
          <ForecastWeatherCard></ForecastWeatherCard>
        </div>
      </div>
    </div>

    <!--
    TODOs:
    - News Chiron
    - Inspiration Quotes/scripture
    - Upcoming space launches (https://launchlibrary.net/docs/1.3/api.html)
    - Astronomical Events
    - Astrology i guess
    - Recent Earthquakes
    - Planes overhead (https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=43.6954&lng=-116.354&fDstL=0&fDstU=50)
    - Pregnancy Tracker
    - Air Quality
    - Ski Resort Snow
    - Trello board?
    https://github.com/toddmotto/public-apis
    -->

  </div>

</template>

<script>
  import * as widgets from '~/components/widgets/widgets'
  import {format} from 'date-fns'

  export default {
    name: "index",
    components: widgets,
    data: function () {
      return {
        currentDate: new Date()
      }
    },
    created() {
      setInterval(function () {
        this.currentDate = new Date();
      }.bind(this), 10000)
    },
    filters: {
      formatDate(val) {
        return format(val, 'dddd MMM Do h:mma')
      }
    }
  }
</script>

<style scoped>
  html {
    background-color: #f4f3ef;
  }

  .main-content {
    padding: 1.5rem;
  }

</style>
