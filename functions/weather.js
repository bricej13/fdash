import axios from 'axios'
exports.handler = function (event, context, callback) {
  axios.get(`https://api.darksky.net/forecast/c0f715aee8939226489cc6be950d8fd0/37.8267,-122.4233`)
    .then(d => {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin" : "*",
        },
        statusCode: 200,
        body: JSON.stringify(d.data)
      });
    })
};
