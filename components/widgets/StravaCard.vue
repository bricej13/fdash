<template>
  <bulma-card>
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
          <input type="number" class="input" id="stravaAthleteId" placeholder="Athlete Id" v-model="local_athleteId">
        </div>

        <div class="field">
          <label class="label" for="stravaGoal">Weekly Goal (m)</label>
          <input type="number" class="input" id="stravaGoal" placeholder="Goal" v-model="local_goal">
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="saveChanges">Done</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="editable = false">Cancel</button>
          </div>
        </div>

      </div>
    </template>

    <template slot="footer">
      <div class="card-footer-item">
        <span>Goal: {{goal | mToMi}}mi</span>
      </div>
      <div class="card-footer-item">
        <i class="ti-reload"></i> Updated {{ $store.state.strava.updated }}
      </div>
    </template>
  </bulma-card>

  <!--
  <div class="card">
    <div class="header">
      <slot name="title">
        <h4 class="title">Strava Distance</h4>
      </slot>
      <p class="category">
        <slot name="subTitle">Weekly total: {{ total | mToMi }}mi <span v-if="total > goal">✔️</span></slot>
      </p>
    </div>
    <div class="content" slot="content">
      <div class="stat-grid">
        <stat name="Run" :value="summary.Run | mToMi" unit="mi" v-if="summary.Run"></stat>
        <stat name="Ride" :value="summary.Ride | mToMi" unit="mi" v-if="summary.Ride"></stat>
        <stat name="Swim" :value="summary.Swim | mToMi" unit="m" v-if="summary.Swim"></stat>
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
  -->
</template>

<script>
  import BulmaCard from '~/components/UIComponents/Cards/BulmaCard'
  import Stat from '~/components/UIComponents/Stat.vue'

  export default {
    name: "StravaCard",
    components: {BulmaCard, Stat},
    props: {
      athleteId: {type: Number},
      goal: {type: Number},
    },
    data: function () {
      return {
        local_goal: this.goal,
        local_athleteId: this.athleteId,
        editable: false
      }
    },
    created: function () {
      if (this.athleteId) {
        this.loadData(this.athleteId);
      }
    },
    computed: {
      total() {
        return this.summary.Run + this.summary.Ride + this.summary.Swim;
      },
      summary() {
        return this.$store.getters['strava/weeklyDistanceSummary'];
      },
    },
    methods: {
      saveChanges() {
        this.editable = false;
        this.$emit('config-changes', {
          goal: Number(this.local_goal),
          athleteId: Number(this.local_athleteId)
        });
        this.loadData(this.local_athleteId)
      },
      loadData(athleteId) {
        this.$store.dispatch('strava/load', {athleteId: athleteId});
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
  .stat-grid {
    display: flex;
    justify-content: space-between;
  }

</style>
