<template>
  <stats-card>
    <div class="icon-big text-center" slot="header">
      <i class="ti-calendar"></i>
    </div>
    <div class="numbers" slot="content">
      <p>{{ $store.state.calendar.events }}</p>
    </div>
    <div class="stats" slot="footer">
      <i class="ti-location-pin"></i>
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "CalendarCard",
    components: {StatsCard},
    created: function () {
      this.$store.dispatch('calendar/load');
    }
  }
</script>

<style scoped>

</style>
