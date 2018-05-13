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
  load({commit}, {athleteId}) {
    this.$axios.get(`/strava?activities=${athleteId}`)
      .then(d => {
          commit('setActivities', d.data);
          commit('updateUpdated');
        }
      );

    this.$axios.get(`/strava?summary=${athleteId}`)
      .then(d => {
          commit('setSummary', d.data);
          commit('updateUpdated');
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
