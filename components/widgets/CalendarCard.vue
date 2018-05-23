<template>
  <widget-card>
    <template slot="title">Weekly Calendar</template>
    <template slot="titleIcon">
      <span @click="editable=true" :disabled="editable" class="mdi mdi-pencil"></span>
    </template>

    <template slot="content">
      <div class="columns is-1 is-variable calendar">
        <div class="column" v-for="day in days" :key="day.date.toString()">
          <div class="" :class="{'is-primary': isSameDay(day.date, new Date())}">
            <div class="message-header">
              <div>{{ day.date | dayName }}</div>
              <div>{{ day.date | dateName }}</div>
            </div>

            <div class="">

              <div class="event" v-for="event in day.events" :key="event.uid" >
                <div class="has-text-weight-bold">{{ event.summary }}</div>
                <div>{{ event | durationDescription }}</div>
              </div>

              <div v-if="day.events.length === 0" class="has-text-centered is-italic has-text-grey">
                No events
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="config" v-if="editable">
      </div>

    </template>

  </widget-card>

</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import WidgetCard from '~/components/WidgetCard.vue'
  import {format, isSameDay} from 'date-fns'

  export default {
    name: "CalendarCard",
    components: {StatsCard, WidgetCard},
    props: {
      calendars: {type: Array}
    },
    data: function () {
      return {
        editable: false
      }
    },
    created: function () {
      this.$store.dispatch('calendar/load');
    },
    computed: {
      days() {
        return this.$store.state.calendar.events;
      }
    },
    methods: {
      isSameDay(left, right) {
        return isSameDay(left, right);
      }
    },
    filters: {
      dayName(val) {
        return isSameDay(new Date(), val) ? "Today" : format(val, "ddd")
      },
      dateName(val) {
        return format(val, "MMM Do")
      },
      durationDescription(event) {
        if (event.allDay) return "All day";

        return format(event.start, "h:mm a") + " - " + format(event.end, "h:mm a")
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/sass/mixins/_variables.scss";

  .calendar .message-body {
    padding: 3px;
  }
  .event {
    margin: .25rem 0;
    padding: 0 3px;
    border-left: 5px solid $success-color;
    background-color: $success-input-bg;
  }

</style>
