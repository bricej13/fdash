<template>
  <div class="card">
    <div class="header">
      <slot name="title">
        <h4 class="title">Strava Distance</h4>
      </slot>
      <p class="category">
        <slot name="subTitle">Weekly goal: {{ goal | mToMi }}mi</slot>
      </p>
    </div>
    <div class="content" slot="content">
      <div class="exercise-progress-bar" :style="{width: (progress.total / goal * 100) + '%'}"
           v-if="$store.state.strava.updated">
        <div class="run-progress progress-chunk" :style="{width: progress.run + '%'}" v-if="progress.run">🏃‍ {{
          summary.Run | mToMi}}mi
        </div>
        <div class="ride-progress progress-chunk" :style="{width: progress.ride + '%'}" v-if="progress.ride">🚴 {{
          summary.Ride| mToMi }}mi
        </div>
        <div class="swim-progress progress-chunk" :style="{width: progress.swim + '%'}" v-if="progress.swim">🏊 {{
          summary.Swim }}m
        </div>
      </div>

      <div class="config">
        <div @click="editable=true" v-if="!editable">edit</div>
        <form v-if="editable">
          <div class="form-group">
            <label for="stravaAthleteId">Athlete Id</label>
            <input type="number" class="form-control" id="stravaAthleteId" placeholder="Athlete Id"
                   v-model="local_athleteId">

            <label for="stravaGoal">Weekly Goal (m)</label>
            <input type="number" class="form-control" id="stravaGoal" placeholder="Goal" v-model="local_goal">

            <button class="btn btn-link" @click="saveChanges">Done</button>
          </div>

        </form>
      </div>

      <div class="footer">
        <hr>
        <div class="stats">
          <slot name="footer">
            <i class="ti-reload"></i> Updated {{ $store.state.strava.updated }}
          </slot>
        </div>
        <div class="pull-right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'

  export default {
    name: "StravaCard",
    components: {StatsCard},
    props: {
      athleteId: {type: Number},
      goal: {type: Number},
    },
    data: function () {
      return {
        local_goal: 160934 * .6, // 100 miles,
        local_athleteId: this.athleteId,
        editable: false
      }
    },
    created: function () {
      this.$store.dispatch('strava/load');
    },
    computed: {
      summary() {
        return this.$store.getters['strava/weeklyDistanceSummary'];
      },
      progress() {
        let sum = this.summary.Run + this.summary.Ride + this.summary.Swim;

        return {
          run: this.summary.Run > 0 ? this.summary.Run / sum * 100 : 0,
          ride: this.summary.Ride > 0 ? this.summary.Ride / sum * 100 : 0,
          swim: this.summary.Swim > 0 ? this.summary.Swim / sum * 100 : 0,
          total: sum
        }
      }
    },
    methods: {
      saveChanges() {
        this.editable = false;
        this.$emit('config-changes', {
          goal: Number(this.local_goal),
          athleteId: Number(this.local_athleteId)
        })
      }
    },
    filters: {
      mToMi: function (value) {
        if (!value) return '';
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
