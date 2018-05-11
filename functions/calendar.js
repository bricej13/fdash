import axios from 'axios'
import IcalExpander from 'ical-expander'
import {endOfWeek, startOfWeek} from 'date-fns'

exports.handler = function (event, context, callback) {
  axios.get(`https://p23-calendars.icloud.com/published/2/RVWJttFSuClm_aQYlt1JE2USOW1nNAVX6lW0TGvjmMyFGCWNrCWtk-ybiJJLV4gkBYw6M8h_qdqTLhLLvD_n0lVcigVrlxOhsHZ1xzNNzBQ`)
    .then(d => {

      const icalExpander = new IcalExpander({ics: d.data, maxIterations: 100});
      const events = icalExpander.between(startOfWeek(new Date()), endOfWeek(new Date()));

      const mappedEvents = events.events.map(e => ({
        startDate: e.startDate.toString(),
        end: e.endDate.toString(),
        duration: e.endDate.hour - e.startDate.hour,
        allDay: e.endDate.hour - e.startDate.hour === 0,
        summary: e.summary,
      }));
      const mappedOccurrences = events.occurrences.map(o => ({
        startDate: o.startDate.toString(),
        end: o.endDate.toString(),
        summary: o.item.summary,
        allDay: o.endDate.hour - o.startDate.hour === 0,
        duration: o.endDate.hour - o.startDate.hour,
      }));

      const allEvents = [].concat(mappedEvents, mappedOccurrences);

      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(allEvents)
      });
    })
};

