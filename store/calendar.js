import {isSameDay, eachDay, addDays, startOfDay, endOfDay} from 'date-fns'

export const state = () => ({
  events: []
});

export const mutations = {
  setEvents(state, data) {
    state.events = data;
  },
};

export const actions = {
  load(context) {

    const date = new Date();
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    this.$axios.get(`/calendar`)
      .then(res => {
          let weekDays = eachDay(startOfDay(new Date()), endOfDay(addDays(new Date(), 4)));
          let calendar = weekDays.map(day => {
            return {
              date: day,
              events: res.data.filter(event => isSameDay(event.start, day))
            }
          });


          context.commit('setEvents', calendar);
        }
      )
  }
};
