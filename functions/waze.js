import axios from 'axios'

exports.handler = function (event, context, callback) {


  const referer = 'https://www.waze.com/livemap';
  const instance = axios.create({
    baseURL: 'https://www.waze.com/RoutingManager/',
    timeout: 1000,
    headers: {'referer': referer, 'origin': 'https://www.waze.com'}
  });


  instance.get('routingRequest?from=x%3A-116.3540138+y%3A43.6954424&to=x%3A-116.2023442+y%3A43.634878&at=0&returnJSON=true&returnGeometries=true&returnInstructions=true&timeout=60000&nPaths=1&clientVersion=4.0.0&options=AVOID_TRAILS%3At%2CALLOW_UTURNS%3At')
    .then(d => {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=600"
        },
        statusCode: 200,
        body: JSON.stringify(d.data)
      });
    });


};
