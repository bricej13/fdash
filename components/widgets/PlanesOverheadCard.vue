<template>
  <widget-card>
    <template slot="title" :loading="loading">Planes Overhead</template>

    <template slot="titleIcon">
      <!--<span class="mdi mdi-pencil"></span>-->
    </template>

    <template slot="content">
      <div v-for="plane in planes" :key="plane.Id" class="box">
        <span class="mdi mdi-airplane" :title="plane.Trak + ' deg'" :style="{'--trak': plane.Trak + 'deg'}"></span>
        <!-- {{ plane.Mdl }} -->
        {{ plane.Dst }}km
        {{ plane.Op }}
        {{ plane.From }}
        {{ plane.To }}
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
        loading: true
      }
    },
    created() {
      this.loadPlanes();
      setInterval(this.loadPlanes.bind(this), 60000)
    },
    methods: {
      loadPlanes() {
        this.$axios.get(`/planes?lat=43.6954&long=-116.354&dist=50`)
          .then(d => {
              this.planes = d.data.acList.filter(p => !p.Gnd);
              this.loading = false;
            }
          );

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
