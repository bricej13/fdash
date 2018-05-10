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
      .then(d => {
          context.commit('setEvents', d.data.split('\n'));
        }
      )
  }
};
