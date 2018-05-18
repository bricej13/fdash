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
          <RiverLevelCard></RiverLevelCard>
        </div>
        <div class="column">
          <CurrentWeatherCard :lat="43.6954" :long="-116.354"></CurrentWeatherCard>
        </div>
        <div class="column">
          <StravaCard :athleteId="12167062"></StravaCard>
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
