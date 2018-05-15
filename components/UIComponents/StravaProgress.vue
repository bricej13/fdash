<template>

  <div class="exercise-progress-bar" :style="{width: Math.min(100, (progress.total / goal * 100)) + '%'}"
       v-if="$store.state.strava.updated">
    <div class="run-progress progress-chunk" :style="{width: progress.run + '%'}" v-if="summary.Run">🏃‍ {{
      summary.Run | mToMi}}mi
    </div>
    <div class="ride-progress progress-chunk" :style="{width: progress.ride + '%'}" v-if="summary.Ride">🚴 {{
      summary.Ride| mToMi }}mi
    </div>
    <div class="swim-progress progress-chunk" :style="{width: progress.swim + '%'}" v-if="summary.Swim">🏊 {{
      summary.Swim }}m
    </div>
  </div>

</template>

<script>
  export default {
    name: "StravaProgress",
    props: ['summary', 'goal'],
    computed: {
      progress() {
        return {
          run: this.summary.Run > 0 ? this.summary.Run / this.total * 100 : 0,
          ride: this.summary.Ride > 0 ? this.summary.Ride / this.total * 100 : 0,
          swim: this.summary.Swim > 0 ? this.summary.Swim / this.total * 100 : 0,
          total: this.total
        }
      }
    },
    filters: {
      mToMi: function (value) {
        if (typeof value !== 'number') return '';
        return Math.round(value / 160.934) / 10
      }
    }
  }
</script>

<style scoped>

  .exercise-progress-bar {
    border-radius: 0;
  }

  .progress-chunk {
    display: inline-block;
    padding: 5px;
    color: white;
  }

  .run-progress {
    background-color: #F3BB45;
  }

  .ride-progress {
    background-color: #41B883;
  }

  .swim-progress {
    background-color: #68B3C8;
  }

</style>
