<template>
  <widget-card :loading="$store.state.strava.dataLoaded < 2">
    <template slot="title">Strava Distance</template>
    <template slot="titleIcon">
      <span @click="editable=true" :disabled="editable" class="mdi mdi-pencil"></span>
    </template>
    <template slot="content">


      <div class="columns has-text-centered" v-if="!editable">
        <div class="column" v-if="summary.Run">
          <div class="has-text-grey">RUN</div>
          <div class="is-size-2">{{ summary.Run | mToMi }}<span class="is-size-4 has-text-grey"> mi</span></div>
        </div>
        <div class="column" v-if="summary.Ride">
          <div class="has-text-grey">RIDE</div>
          <div class="is-size-2">{{ summary.Ride | mToMi }}<span class="is-size-4 has-text-grey"> mi</span></div>
        </div>
        <div class="column" v-if="summary.Swim">
          <div class="has-text-grey">SWIM</div>
          <div class="is-size-2">{{ summary.Swim }}<span class="is-size-4 has-text-grey"> m</span></div>
        </div>
      </div>

      <div class="config" v-if="editable">

        <div class="field">
          <label class="label" for="stravaAthleteId">Athlete Id</label>
          <input type="number" class="input" id="stravaAthleteId" placeholder="Athlete Id" v-model.number="athleteId">
        </div>

        <div class="field">
          <label class="label" for="stravaGoal">Weekly Goal (meters)</label>
          <input type="number" class="input" id="stravaGoal" placeholder="Goal" v-model.number="goal">
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="saveChanges" :disabled="!athleteId">Done</button>
          </div>
          <div class="control" v-if="!firstTimeSetup">
            <button class="button is-text" @click.prevent="cancelChanges">Cancel</button>
          </div>
        </div>

      </div>
    </template>

    <template slot="footer" v-if="!editable">
      <div class="card-footer-item">
        <span>Goal: {{goal | mToMi}}mi</span>&nbsp;<span v-if="total > goal" class="mdi mdi-check has-text-success"></span>
      </div>
      <div class="card-footer-item">
        <i class="ti-reload"></i> Updated {{ $store.state.strava.updated }}
      </div>
    </template>
  </widget-card>

</template>

<script>
  import WidgetCard from '~/components/WidgetCard'

  export default {
    name: "StravaCard",
    components: {WidgetCard},
    data: function () {
      return {
        athleteId: null,
        goal: null,
        editable: false,
        firstTimeSetup: false
      }
    },
    created: function () {
      let config = JSON.parse(localStorage.getItem('stravaConfig'));

      if (config && config.athleteId) {
        this.athleteId = config.athleteId;
        this.goal = config.goal;
        this.loadData();
      }
      else {
        this.firstTimeSetup = true;
        this.editable = true;
      }
    },
    computed: {
      total() {
        return this.summary.Run + this.summary.Ride + this.summary.Swim;
      },
      summary() {
        return this.$store.getters['strava/weeklyDistanceSummary'];
      },
      loading() {
        return !this.summary();
      },
    },
    methods: {
      saveChanges() {
        localStorage.setItem('stravaConfig', JSON.stringify({
          athleteId: this.athleteId,
          goal: this.goal
        }));
        this.editable = false;
        this.loadData()
      },
      cancelChanges() {
        let config = JSON.parse(localStorage.getItem('stravaConfig'));
        this.athleteId = config.athleteId;
        this.goal = config.goal;
        this.editable = false;
      },
      loadData() {
        this.$store.dispatch('strava/load', {athleteId: this.athleteId});
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

</style>
