export const state = () => ({
  location: "",
  current: {},
  forecast: [],
  units: {}
});

export const mutations = {
  setLocation(state, location) {
    state.location = location;
  },
  setUnits(state, units) {
    state.units = units;
  },
  setCurrent(state, current) {
    state.current = current;
  },
  setForecast(state, forecast) {
    state.forecast = forecast;
  }
};

export const actions = {
  load(context) {

    const date = new Date();
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    this.$axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22eagle%2C%20id%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then(d => {
          // console.log(d.data)
          const current = Object.assign({},
            d.data.query.results.channel.item.condition,
            d.data.query.results.channel.wind,
            d.data.query.results.channel.atmosphere,
            d.data.query.results.channel.astronomy,
          );
          context.commit('setLocation', d.data.query.results.channel.location.city + ', ' + d.data.query.results.channel.location.region);
          context.commit('setUnits', d.data.query.results.channel.units);
          context.commit('setCurrent', current);
          context.commit('setForecast', d.data.query.results.channel.item.forecast);
        }
      )

  }
};
