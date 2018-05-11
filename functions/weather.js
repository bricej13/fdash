import axios from 'axios'
exports.handler = function (event, context, callback) {
  axios.get(`https://api.darksky.net/forecast/c0f715aee8939226489cc6be950d8fd0/43.688735, -116.346076`)
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
