export const state = () => ({
  level: null,
  updated: null
});

export const mutations = {
  setLevel(state, level) {
    state.level = level;
  },
  setUpdated(state, updated) {
    state.updated = updated;
  }
};

export const actions = {
  load(context) {
    const date = new Date();
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    this.$axios.get(`/river`)
      .then(d => {
          context.commit('setLevel', d.data.flow);
          context.commit('setUpdated', d.data.updated);
        }
      )
  }
};
