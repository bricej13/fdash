import strava from 'strava-v3'

exports.handler = function (event, context, callback) {

  if (event.queryStringParameters.summary) {
    console.log('loading summary');
    strava.athletes.stats({id: event.queryStringParameters.summary}, function (err, payload, limits) {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=300"
        },
        statusCode: 200,
        body: err ? JSON.stringify(err) : JSON.stringify(payload)
      });
    });
  }

  else if (event.queryStringParameters.activities) {
    console.log('loading activities');
    const firstDayOfWeek = getMonday(new Date);
    strava.athlete.listActivities({id: event.queryStringParameters.activities, after: firstDayOfWeek.getTime() / 1000}, function (err, payload, limits) {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=300"
        },
        statusCode: 200,
        body: err ? JSON.stringify(err) : JSON.stringify(payload)
      });
    });
  }

  else {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=300"
      },
      statusCode: 400,
      body: ""
    })
  }

};

function getMonday(date) {
  let day = date.getDay() || 7;
  if (day !== 1)
    date.setHours(-24 * (day - 1));
  return date;
}
