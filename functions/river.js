import axios from 'axios'
exports.handler = function (event, context, callback) {
  const date = new Date();
  const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
  axios.get(`https://waterdata.usgs.gov/id/nwis/dv?cb_00010=on&cb_00060=on&format=rdb&site_no=13206000&referred_module=sw&period=&begin_date=${dateString}&end_date=${dateString}`)
    .then(d => {
        let arr = d.data.trim().split('\n');
        let line = arr[arr.length - 1];
        let pieces = line.split('\t');

        let data = {
          flow: pieces[3],
          updated: pieces[2]
        };
        callback(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          statusCode: 200,
          body: JSON.stringify(data)
        });
      }
    )
};
