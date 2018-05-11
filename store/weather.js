
export const state = () => ({
  updated: null,
  current: {},
  minutely: {},
  hourly: {},
  daily: {},
  alerts: []
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
  setAlerts(state, alerts) {
    state.alerts = alerts;
  },
  updateUpdated(state) {
    state.updated = new Date().toLocaleString();
  }
};

export const actions = {
  load({commit, state}) {
    this.$axios.get(`/weather`)
      .then(d => {
          commit('setCurrent', d.data.currently);
          commit('setMinutely', d.data.minutely);
          commit('setHourly', d.data.hourly);
          commit('setDaily', d.data.daily);
          commit('setAlerts', d.data.alerts || []);
          commit('updateUpdated');
        }
      )
  }
};

export const getters = {
  dailyChartData: state => {
    return !state.updated ? {} :
      {
        type: 'line',
        data: {
          labels: state.daily.data.map(d => new Date(d.time * 1000).toString().split(" ")[0]),
          series: [
            {
              name: 'precipitation',
              data: state.daily.data.map(d => d.precipProbability * 100)
            },
            {
              name: 'low',
              data: state.daily.data.map(d => d.temperatureLow)
            },
            {
              name: 'high',
              data: state.daily.data.map(d => d.temperatureHigh)
            },
            {
              name: 'current',
              data: [state.current.temperature]
            },
          ]
        },
        options: {
          series: {
            low: {
              showPoint: false,
            },
            high: {
              showPoint: false,
            },
            current: {
              // lineSmooth: Chartist.Interpolation.cardinal({fillHoles: true,})
            },
            precipitation: {
              showPoint: false,
              showArea: true,
              showLine: false
            }
          }
        }
      }
  }
};
