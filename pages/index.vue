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
        :class="{editable: editable}"
      >
        <grid-item v-for="widget in layout"
                   :x="widget.x"
                   :y="widget.y"
                   :w="widget.w"
                   :h="widget.h"
                   :i="widget.i"
                   :key="widget.i"
                   class="grid-item">

          <component
            v-bind:is="widget.template"
            v-bind="widget.props"
            v-on:config-changes="widget.props = $event"
          ></component>

        </grid-item>
      </grid-layout>
    </no-ssr>
  </div>
</template>
<script>
  import * as widgets from '~/components/widgets/widgets'

  export default {
    layout: "dashboard",
    components: widgets,
    created: function () {
      if (process.browser) {
        let storageLayout = localStorage.getItem("layout");
        this.layout = storageLayout ? JSON.parse(storageLayout) :
          [
            {"x": 0, "y": 0, "w": 4, "h": 3, "i": "0", template: 'StravaCard', props: {athleteId: 12167062, goal: 1600*50}},
            {"x": 4, "y": 0, "w": 4, "h": 3, "i": "1", template: 'RiverLevelCard', props: {usgsSite: 13206000}},
            {"x": 8, "y": 0, "w": 4, "h": 3, "i": "2", template: 'CurrentWeatherCard', props: {lat: 43.688735, long: -116.346076}},
            {"x": 0, "y": 4, "w": 12, "h": 8, "i": "3", template: 'ForecastWeatherCard', props: {lat: 43.688735, long: -116.346076}},
            {"x": 0, "y": 13, "w": 12, "h": 4, "i": "4", template: 'CalendarCard', props: {calendars: []}},
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
    watch: {
      layout: {
        deep: true,
        handler: function (val) {
          localStorage.setItem('layout', JSON.stringify(val));
        }
      }
    },
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
