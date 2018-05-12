<template>
  <div>
    <div class="row">
      <div class="col-sm-1 col-sm-offset-11">
        <button type="button" class="btn btn-link" @click="editable = !editable">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          {{ editable ? 'Done' : '' }}
        </button>
      </div>
    </div>

    <no-ssr>

      <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="50"
        :is-draggable="editable"
        :is-resizable="editable"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-updated="saveLayout"
        :class="{editable: editable}"
      >
        <grid-item v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   class="grid-item"
        >
          <component v-bind:is="item.template"></component>
        </grid-item>
      </grid-layout>
    </no-ssr>
  </div>
</template>
<script>
  import * as widgets from '~/components/widgets/widgets'

  export default {
    layout: "dashboard",
    methods: {},
    components: widgets,
    created: function () {
      if (process.browser) {
        let storageLayout = localStorage.getItem("layout");
        this.layout = storageLayout ? JSON.parse(storageLayout) :
          [
            {"x": 0, "y": 0, "w": 4, "h": 3, "i": "0", template: 'StravaCard'},
            {"x": 4, "y": 0, "w": 4, "h": 3, "i": "1", template: 'RiverLevelCard'},
            {"x": 8, "y": 0, "w": 4, "h": 3, "i": "2", template: 'CurrentWeatherCard'},
            {"x": 0, "y": 4, "w": 12, "h": 8, "i": "3", template: 'ForecastWeatherCard'},
            {"x": 0, "y": 13, "w": 12, "h": 4, "i": "4", template: 'CalendarCard'},
          ]
      }
    },
    data: function () {
      return {
        editable: false,
        layout: []
      }
    },
    computed: {
      widgetList() {
        return Object.keys(widgets);
      }
    },
    methods: {
      saveLayout(payload) {
        localStorage.setItem('layout', JSON.stringify(payload));
      }
    }
  }

</script>
<style>
  .grid-item {
    padding: 0px 5px 5px 0px;
  }

  .card {
    height: 100%;
    width: 100%;
    transition: opacity .10s ease-in-out;
  }
  .editable .card {
    opacity: .4;
  }
  .editable .card:hover {
    opacity: 1;
  }
</style>
