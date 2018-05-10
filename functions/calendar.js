import axios from 'axios'
exports.handler = function (event, context, callback) {
  axios.get(`https://p23-calendars.icloud.com/published/2/RVWJttFSuClm_aQYlt1JE2USOW1nNAVX6lW0TGvjmMyFGCWNrCWtk-ybiJJLV4gkBYw6M8h_qdqTLhLLvD_n0lVcigVrlxOhsHZ1xzNNzBQ`)
    .then(d => {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin" : "*",
        },
        statusCode: 200,
        body: d.data
      });
    })
};
