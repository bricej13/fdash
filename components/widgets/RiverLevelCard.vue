<template>
  <bulma-card :loading="loading">
    <template slot="title">{{location || 'River Levels'}}</template>
    <template slot="titleIcon">
      <span @click="editable=true" :disabled="editable" class="mdi mdi-pencil"></span>
    </template>

    <template slot="content">
      <div v-if="!editable">
        <div class="subtitle">{{days}} Day Trend:</div>
        <trend
          :data="values"
          :gradient="['#41B883', '#F3BB45', '#EB5E28']"
          auto-draw
          smooth
        ></trend>
      </div>

      <div class="config" v-if="editable">
        <div class="field">
          <label class="label" for="siteInput">USGS Site Number</label>
          <input type="number" class="input" id="siteInput" placeholder="Site Number"
                 v-model.number="site">
        </div>

        <div class="field">
          <label class="label" for="paramCodeInput">Param Code</label>
          <input type="number" class="input" id="paramCodeInput" placeholder="Param Code" v-model="paramCode">
        </div>

        <div class="field">
          <label class="label" for="daysInput">How many days to retrieve history for</label>
          <input type="number" class="input" id="daysInput" placeholder="Days"
                 v-model.number="days">
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="saveChanges" :disabled="!site || !paramCode || !days">Done</button>
          </div>
          <div class="control" v-if="!firstTimeSetup">
            <button class="button is-text" @click.prevent="cancelChanges">Cancel</button>
          </div>
        </div>

      </div>

    </template>

    <template slot="footer" v-if="!editable">
      <div class="card-footer-item">
        <b>{{value}} </b>&nbsp;<span style="color:#AAA">{{unit}}</span>
      </div>
      <div class="card-footer-item">
        Updated {{measurementDate ? measurementDate.toLocaleTimeString() : ''}}
      </div>
    </template>

  </bulma-card>

</template>

<script>
  import BulmaCard from '~/components/UIComponents/Cards/BulmaCard'
  import Trend from 'vuetrend'

  export default {
    name: "RiverLevelCard",
    components: {BulmaCard, Trend},
    data: function () {
      return {
        editable: false,
        value: null,
        values: [0],
        measurementDate: null,
        unit: '',
        bodyOfWater: '',
        location: '',
        site: null,
        paramCode: '',
        days: 7,
        loading: true,
        firstTimeSetup: false
      }
    },
    created: function () {
      let config = JSON.parse(localStorage.getItem('riverConfig'));

      if (config && config.site && config.paramCode) {
        this.site = config.site;
        this.paramCode = config.paramCode;
        this.days = config.days;
        this.loadData();
      }
      else {
        this.editable = true;
        this.firstTimeSetup = true;
      }
    },
    methods: {
      saveChanges() {
        localStorage.setItem('riverConfig', JSON.stringify({
          site: this.site,
          paramCode: this.paramCode,
          days: this.days
        }));
        this.editable = false;
        this.loadData();
      },
      cancelChanges() {
        this.editable = false;
      },
      loadData() {
        this.loading = true;
        this.$axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${this.site}&parameterCd=${this.paramCode}&period=P${this.days || 1}D&siteStatus=all`)
          .then(d => {
            this.location = d.data.value.timeSeries[0].sourceInfo.siteName.split(' AT ')[1];
            this.unit = d.data.value.timeSeries[0].variable.unit.unitCode;

            this.values = d.data.value.timeSeries[0].values[0].value.map(v => Number(v.value));

            this.value = Number(this.values[this.values.length - 1]);
            this.measurementDate = new Date(d.data.value.timeSeries[0].values[0].value[this.values.length - 1].dateTime);

            this.loading = false;
          })

      }
    }
  }
</script>

<style scoped>

</style>
