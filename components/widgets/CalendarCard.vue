<template>

  <div class="card">
    <div class="header">
      <slot name="title">
        <h4 class="title">Weekly Calendar</h4>
      </slot>
      <p class="category">
        <slot name="subTitle">Weekly goal:</slot>
      </p>
    </div>
    <div class="content" slot="content">

      <div class="calendar-wrapper">
        <div class="calendar-day" v-for="day in days" :key="day.date.toString()"
             :class="{today: isSameDay(day.date, new Date())}">
          <div class="day-header">
            {{ day.date | dayName }}
          </div>
          <div class="calendar-event" v-for="event in day.events" :key="event.uid">
            <div class="event-header">{{ event.summary }}</div>
            <div>{{ event | durationDescription }}</div>

          </div>
        </div>
      </div>

      <div class="footer">
        <div class="stats">
          <slot name="footer">
            <i class="ti-reload"></i> What goes here?
          </slot>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
  import StatsCard from '~/components/UIComponents/Cards/StatsCard.vue'
  import {format, isSameDay} from 'date-fns'

  export default {
    name: "CalendarCard",
    components: {StatsCard},
    props: {
      calendars: { type: Array }
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
        return isSameDay(new Date(), val) ? "Today" : format(val, "MMM Do")
      },
      durationDescription(event) {
        if (event.allDay) return "All day";

        return format(event.start, "h:mm a") + " - " + format(event.end, "h:mm a")
      }
    }
  }
</script>

<style scoped>
  .calendar-wrapper {
    display: flex;
    flex-direction: row;
  }

  .calendar-day {
    flex-grow: 1;
    flex-basis: 0;
    border: 1px solid #a9a9a9;
  }

  .calendar-day.today {
    background-color: rgba(104, 179, 200, .2);
  }

  .calendar-day .day-header {
    font-weight: bold;
    border-bottom: 1px solid #a9a9a9;
    text-align: center;
    padding: 3px;
  }

  .calendar-event {
    background-color: rgba(65, 184, 131, .75);;
    margin-bottom: 5px;
    padding: 3px;

  }

  .calendar-event .event-header {
    font-weight: bold;
  }

</style>
