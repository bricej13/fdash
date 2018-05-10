export const state = () => ({
  updated: null,
  current: {},
  minutely: {},
  hourly: {},
  daily: {}
});

export const mutations = {
  setCurrent(state, current) {
    state.current = current;
  },
  setMinutely(state, minutely) {
    state.minutely = minutely;
  },
  setHourly(state, hourly) {
    state.hourly = hourly;
  },
  setDaily(state, daily) {
    state.daily = daily;
  },
  updateUpdated(state) {
    state.updated = new Date().toLocaleString();
  }
};

export const actions = {
  load(context) {

    const date = new Date();
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    this.$axios.get(`/weather`)
      .then(d => {

          context.commit('setCurrent', d.data.currently);
          context.commit('setMinutely', d.data.minutely);
          context.commit('setHourly', d.data.hourly);
          context.commit('setDaily', d.data.daily);
          context.commit('updateUpdated');
        }
      )

  }
};
