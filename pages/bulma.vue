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
            <!-- :lat="43.6954" :long="-116.354" -->
          </no-ssr>
        </div>
        <div class="column">
          <no-ssr>
            <StravaCard></StravaCard>
          </no-ssr>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import * as widgets from '~/components/widgets/widgets'
  import {format} from 'date-fns'

  export default {
    name: "bulma",
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
