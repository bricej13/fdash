import axios from 'axios'

exports.handler = function (event, context, callback) {
  let lat = event.queryStringParameters.lat;
  let long = event.queryStringParameters.long;

  if (!process.env.DARKSKY_API_KEY) {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      },
      statusCode: 401,
      body: "DARKSKY_API_KEY is not set. Visit  https://darksky.net to  sign up."
    });
  }

  if (lat && long) {
    axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat}, ${long}`)
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
