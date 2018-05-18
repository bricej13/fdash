export const state = () => ({
  updated: null,
  activities: [],
  summary: {},
  dataLoaded: 0
});

export const mutations = {
  setActivities(state, data) {
    state.activities = data;
  },
  setSummary(state, data) {
    state.summary = data;
  },
  updateUpdated(state) {
    state.updated = new Date().toLocaleTimeString();
  },
  dataLoaded(state) {
    state.dataLoaded++;
  }
};

export const actions = {
  load({commit, state}, {athleteId}) {
    let dataLoaded = 0;
    this.$axios.get(`/strava?activities=${athleteId}`)
      .then(d => {
          commit('setActivities', d.data);
          commit('updateUpdated');
          commit('dataLoaded');
        }
      );

    this.$axios.get(`/strava?summary=${athleteId}`)
      .then(d => {
          commit('setSummary', d.data);
          commit('updateUpdated');
          commit('dataLoaded');
        }
      )

  }
};

export const getters = {
  weeklyDistanceSummary: state => {
    return state.activities.reduce(function (acc, activity) {
      acc[activity.type] += activity.distance;
      return acc;
    }, {'Ride': 0, 'Swim': 0, 'Run': 0});
  }
};
