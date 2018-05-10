export const state = () => ({
  updated: null,
  activities: [],
  summary: {},
});

export const mutations = {
  setActivities(state, data) {
    state.activities = data;
  },
  setSummary(state, data) {
    state.summary = data;
  },
  updateUpdated(state) {
    state.updated = new Date().toLocaleString();
  }
};

export const actions = {
  load(context) {

    this.$axios.get(`/strava?activities=weekly`)
      .then(d => {
          context.commit('setActivities', d.data);
          context.commit('updateUpdated');
        }
      );

    this.$axios.get(`/strava?summary=true`)
      .then(d => {
          context.commit('setSummary', d.data);
          context.commit('updateUpdated');
        }
      )

  }
};

export const getters = {
  weeklyDistanceSummary: state => {
    return state.activities.reduce(function(acc, activity) {
      acc[activity.type] += activity.distance;
      return acc;
    }, {'Ride': 0, 'Swim': 0, 'Run': 0});
  }
};
