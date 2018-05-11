
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
  load({commit, state}) {
    this.$axios.get(`/weather`)
      .then(d => {
          commit('setCurrent', d.data.currently);
          commit('setMinutely', d.data.minutely);
          commit('setHourly', d.data.hourly);
          commit('setDaily', d.data.daily);
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
          state.daily.data.map(d => d.precipProbability * 100),
          state.daily.data.map(d => d.temperatureLow),
          state.daily.data.map(d => d.temperatureHigh),
          [state.current.temperature],
        ]
        /*
        datasets: [
          {
          label: 'Unfilled',
          fill: false,
          data: state.daily.data.map(d => d.temperatureLow),
        }, {
          label: 'Dashed',
          fill: false,
          borderDash: [5, 5],
          data: state.daily.data.map(d => d.temperatureHigh),
        }, {
          label: 'Filled',
          data: state.daily.data.map(d => d.precipProbability * 100),
          fill: true,
        }]
        */
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    }

    /*
    return !state.updated ? {} :
      {
        data: {
          labels: state.daily.data.map(d => new Date(d.time * 1000).toString().split(" ")[0]),
          datasets: [
            {
              label: 'Lows',
              data: state.daily.data.map(d => d.temperatureLow),
            },
            {
              label: 'Highs',
              data: state.daily.data.map(d => d.temperatureHigh),
            },
            {
              label: 'Precipitation',
              fill: true,
              data: state.daily.data.map(d => d.precipProbability * 100),
            },
            {
              label: 'Current',
              data: [state.current.temperature]
            }
          ],
          /*
          series: [
            state.daily.data.map(d => d.temperatureLow),
            state.daily.data.map(d => d.temperatureHigh),
            [state.current.temperature],
            state.daily.data.map(d => d.precipProbability * 100),
          ]
        },
        options: {}
      }
      */
  }
};
