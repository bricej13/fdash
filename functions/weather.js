import axios from 'axios'

exports.handler = function (event, context, callback) {
  let lat = event.queryStringParameters.lat;
  let long = event.queryStringParameters.long;

  if (lat && long) {
    axios.get(`https://api.darksky.net/forecast/c0f715aee8939226489cc6be950d8fd0/${lat}, ${long}`)
      .then(d => {
        callback(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "max-age=600"
          },
          statusCode: 200,
          body: JSON.stringify(d.data)
        });
      })
  } else {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      },
      statusCode: 400,
      body: ""
    });
  }
};
