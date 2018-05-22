<template>
  <widget-card>
    <template slot="title">Should I Ride?</template>

    <template slot="titleIcon">
      <!--<span class="mdi mdi-pencil"></span>-->
    </template>

    <template slot="content">

    </template>

  </widget-card>
</template>

<script>
  import WidgetCard from '~/components/WidgetCard'

  export default {
    name: "ShouldIRideCard",
    components: {WidgetCard},
    data: function () {
      return {
        route: [],
        waypoints: []
      }
    },
    created() {
      const distanceLimit = 8000; // 5 miles
      const timeLimit = 600; // 10 minutes
      this.$axios.get(`/waze`)
        .then(d => {
            this.route = d.data.response.results;

            this.route.reduce((acc, cur) => {
                acc.distanceAcc += cur.length;
                acc.timeAcc += cur.crossTime;
                if (acc.distanceAcc > distanceLimit || acc.timeAcc > timeLimit) {
                  this.waypoints.push(cur);
                  acc.distanceAcc = 0;
                  acc.timeAcc = 0;
                }
                return acc;
              },
              {distanceAcc: 0, timeAcc: 1000}
            )
          }
        );
    },
    computed: {}
  }
</script>

<style scoped>

</style>
