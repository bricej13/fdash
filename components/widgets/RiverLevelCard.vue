<template>
  <card>
    <h4 slot="header" class="title">{{bodyOfWater}}</h4>

    <div slot="subTitle">{{location}}</div>

    <div slot="content">
      <div>7 Day Trend:</div>
      <div class="trend-container">
        <trend
          :data="values7Days"
          :gradient="['#41B883', '#F3BB45', '#EB5E28']"
          auto-draw
          smooth
        ></trend>
      </div>
      Currently: <b>{{value}} </b> <span style="color:#AAA">{{unit}}</span>
    </div>

    <div slot="footer">
      <i class="ti-reload"></i> Updated {{measurementDate}}
    </div>
  </card>

</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import Card from '~/components/UIComponents/Cards/Card.vue'
  import Trend from 'vuetrend'

  export default {
    name: "RiverLevelCard",
    components: {StatsCard, Trend, Card},
    props: {
      usgsSite: {type: Number}
    },
    data: function () {
      return {
        value: null,
        values: [0],
        measurementDate: null,
        unit: '',
        bodyOfWater: '',
        location: '',
        site: 13206000,
        paramCode: '00060',
        loading: true,

      }
    },
    created: function () {
      this.loading = true;
      this.$axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${this.site}&parameterCd=${this.paramCode}&period=P7D&siteStatus=all`)
        .then(d => {
          this.bodyOfWater = d.data.value.timeSeries[0].sourceInfo.siteName.split(' AT ')[0];
          this.location = d.data.value.timeSeries[0].sourceInfo.siteName.split(' AT ')[1];
          this.unit = d.data.value.timeSeries[0].variable.unit.unitCode;

          this.values = d.data.value.timeSeries[0].values[0].value.map(v => Number(v.value));

          this.value = Number(this.values[this.values.length - 1]);
          this.measurementDate = new Date(d.data.value.timeSeries[0].values[0].value[this.values.length - 1].dateTime);

          this.loading = false;
        })
    },
    computed: {
      valuesToday() {
        return this.values.slice(Math.max(0, this.values.length - 95), this.values.length);
      },
      values7Days() {
        return this.values.slice(Math.max(0, this.values.length - 95 * 7), this.values.length - 95);
      },
      valueMax() {
        return this.values.reduce((acc, cur) => Math.max(acc, cur));
      },
      valueMin() {
        return this.values.reduce((acc, cur) => Math.min(acc, cur));
      }
    }
  }
</script>

<style scoped>
  .trend-container {
    display: flex;
  }

</style>
