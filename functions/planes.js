import axios from 'axios'

exports.handler = function (event, context, callback) {
  const lat = event.queryStringParameters.lat;
  const long = event.queryStringParameters.long;
  const dist = event.queryStringParameters.dist;

  if (lat && long && dist) {
    axios.get(`https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=${dist}`)
      .then(d => {
        callback(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "max-age=60"
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
