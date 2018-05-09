<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="ti-pulse"></i>
    </div>
    <div class="numbers" slot="content">
      <p>Boise River Level</p>
      {{ $store.state.river.level }} <span style="color:#AAA">ft³/s</span>
    </div>
    <div class="stats" slot="footer">
      <i class="ti-reload"></i> Updated {{ $store.state.river.updated }}
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "RiverLevelCard",
    components: {StatsCard},
    created: function () {
      setInterval(function() {
        this.$store.dispatch('river/load');
      }, 21600000)
    }
  }
</script>

<style scoped>

</style>
