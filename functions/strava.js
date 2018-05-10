import strava from 'strava-v3'

exports.handler = function (event, context, callback) {
  const athId = 12167062;

  if (event.queryStringParameters.summary) {
    console.log('loading summary');
    strava.athletes.stats({id: athId}, function (err, payload, limits) {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(payload)
      });
    });
  }

  else if (event.queryStringParameters.activities && event.queryStringParameters.activities === 'weekly') {
    console.log('loading activities');
    const firstDayOfWeek = getMonday(new Date);
    strava.athlete.listActivities({id: athId, after: firstDayOfWeek.getTime() / 1000}, function (err, payload, limits) {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(payload)
      });
    });
  }

  else {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: ""
    })
  }

};

function getMonday(date) {
  var day = date.getDay() || 7;
  if (day !== 1)
    date.setHours(-24 * (day - 1));
  return date;
}
