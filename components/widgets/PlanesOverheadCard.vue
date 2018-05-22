<template>
  <widget-card>
    <template slot="title" :loading="loading">Planes Overhead</template>

    <template slot="titleIcon">
      <!--<span class="mdi mdi-pencil"></span>-->
    </template>

    <template slot="content">
      <div class="panel">

        <a class="panel-block" v-for="plane in planes" :key="plane.Id">
            <span class="panel-icon">
        <span class="mdi mdi-airplane" :title="plane.Trak + ' deg'" :style="{'--trak': plane.Trak + 'deg'}"></span>
            </span>
          <div>
              {{ plane.Dst }}km
              {{ plane.Op }}
          </div>
          <div v-if="plane.To && plane.From">
              {{ plane.From.split(', ')[0]}} ➡ {{ plane.To.split(', ')[0]}}
          </div>
        </a>
      </div>

      <div class="notification is-danger" v-if="error">
        Unable to retrieve your location data.
      </div>
    </template>

  </widget-card>
</template>

<script>
  import WidgetCard from '~/components/WidgetCard'

  export default {
    name: "PlanesOverheadCard",
    components: {WidgetCard},
    data: function () {
      return {
        planes: [],
        loading: true,
        lat: null,
        long: null,
        dist: 50,
        error: ''
      }
    },
    created() {
      this.getCurrentLocation();
      setInterval(this.loadPlanes.bind(this), 60000)
    },
    methods: {
      getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
          success => {
            this.lat = success.coords.latitude;
            this.long = success.coords.longitude;
            this.loadPlanes()
          },
          err => this.error = err
        );
      },
      loadPlanes() {
        if (this.lat && this.long && this.dist && !window.hidden) {
          this.$axios.get(`/planes?lat=${this.lat}&long=${this.long}&dist=${this.dist}`)
            .then(d => {
                this.planes = d.data.acList.filter(p => !p.Gnd);
                this.loading = false;
              }
            );
        }
      }
    }
  }
</script>

<style scoped>
  .mdi.mdi-airplane {
    --trak: 10deg;
  }

  .mdi.mdi-airplane::before {
    transform: rotate(var(--trak))
  }

</style>
