<template>
  <div>
    <header class="navbar is-primary header" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4">
          Dashboard
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

  export default {
    name: "bulma",
    components: widgets
  }
</script>

<style scoped>
  .main-content {
    padding: 1.5rem;
  }

</style>
