import {isSameDay, eachDay, addDays} from 'date-fns'

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
          let weekDays = eachDay(addDays(new Date(), -3), addDays(new Date(), 3));
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
