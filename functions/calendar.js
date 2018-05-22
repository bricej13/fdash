import axios from 'axios'
import IcalExpander from 'ical-expander'
import {addDays, differenceInMinutes, startOfDay, endOfDay} from 'date-fns'

exports.handler = function (event, context, callback) {
  // axios.get(`https://p23-calendars.icloud.com/published/2/RVWJttFSuClm_aQYlt1JE2USOW1nNAVX6lW0TGvjmMyFGCWNrCWtk-ybiJJLV4gkBYw6M8h_qdqTLhLLvD_n0lVcigVrlxOhsHZ1xzNNzBQ`) // Family Calendar
  axios.get(`https://p23-calendarws.icloud.com/ca/subscribe/1/4VaZoa_-9Ih_5TPWT345YKpDDd6w_HmKC2A0DTJRlA8Z6tEckTaPo3jNL3nuyWLp`) // My Calendar
    .then(d => {

      const icalExpander = new IcalExpander({ics: d.data, maxIterations: 100});

      const events = icalExpander.between(startOfDay(new Date()), endOfDay(addDays(new Date(), 4)));

      const mappedEvents = events.events.map(e => ({
        start: e.startDate.toString(),
        end: e.endDate.toString(),
        duration: differenceInMinutes(e.endDate.toJSDate(), e.startDate.toJSDate()),
        allDay: e.endDate.hour - e.startDate.hour === 0,
        summary: e.summary,
        uid: e.uid
      }));
      const mappedOccurrences = events.occurrences.map(o => ({
        start: o.startDate.toString(),
        end: o.endDate.toString(),
        summary: o.item.summary,
        allDay: o.endDate.hour - o.startDate.hour === 0,
        duration: differenceInMinutes(o.endDate.toJSDate(), o.startDate.toJSDate()),
        uid: o.uid
      }));

      const allEvents = [].concat(mappedEvents, mappedOccurrences).sort(function (a, b) {
        return new Date(a.start) - new Date(b.start)
      });

      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "max-age=60"
        },
        statusCode: 200,
        body: JSON.stringify(allEvents)
      });
    })
};

