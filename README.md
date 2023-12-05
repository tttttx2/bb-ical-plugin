# Bb-ical-plugin
This is a simple icalendar plugin for readonly ical calendars as a custom datasource. Keep in mind, it's a bit hacky ;)

# Example transform
A quick example transform for getting only future (and today's) events within the calendar. No idea what will happen with recurring events, probably dropped.

```
function dateconv(a) {
	  if (a==undefined){return ""}
    const year = a.substr(0, 4);
    const month = parseInt(a.substr(4, 2), 10) - 1;
    const day = a.substr(6, 2);
    const hour = a.substr(9, 2);
    const minute = a.substr(11, 2);
    const second = a.substr(13, 2);
    return new Date(Date.UTC(year, month, day, hour, minute, second));
}

return data.VCALENDAR[0].VEVENT.map(myFunction).filter(myFilter)

function myFunction(num) {
  return {
		'note':num.SUMMARY,
		'start':num['DTSTART;TZID=W. Europe Standard Time'],
		'end':num['DTEND;TZID=W. Europe Standard Time'],
	};
}

function myFilter(num) {
  return dateconv(num.start) - new Date() > 0;
}


```
