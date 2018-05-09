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
    this.$axios.get(`https://waterdata.usgs.gov/id/nwis/dv?cb_00010=on&cb_00060=on&format=rdb&site_no=13206000&referred_module=sw&period=&begin_date=${dateString}&end_date=${dateString}`)
      .then(d => {
          let arr = d.data.trim().split('\n');
          let line = arr[arr.length - 1];
          let pieces = line.split('\t');
          context.commit('setLevel', pieces[3]);
          context.commit('setUpdated', pieces[2]);
        }
      )
  }
};
