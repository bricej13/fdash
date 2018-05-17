<template>
  <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
               width="112" height="28">
        </a>

      </div>
    </nav>

    <div class="columns">
      <div class="column">
        <RiverLevelCard></RiverLevelCard>
      </div>
      <div class="column">
        <CurrentWeatherCard :lat="43.6954" :long="-116.354"></CurrentWeatherCard>
      </div>
      <div class="column">
        <StravaCard></StravaCard>
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

</style>
