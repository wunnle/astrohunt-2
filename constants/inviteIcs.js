const inviteIcs = `BEGIN:VCALENDAR
CALSCALE:GREGORIAN
VERSION:2.0
X-WR-CALNAME:İstanbul Üniversitesi Astronomi ve Uzay Bilimleri Bölümü Gö
 zlem Gecesi
METHOD:PUBLISH
PRODID:-//Apple Inc.//macOS 13.0//EN
BEGIN:VTIMEZONE
TZID:Europe/Istanbul
BEGIN:DAYLIGHT
TZOFFSETFROM:+0200
DTSTART:20150329T030000
RRULE:FREQ=YEARLY;UNTIL=20160327T010000Z;BYMONTH=3;BYDAY=-1SU
TZNAME:GMT+3
TZOFFSETTO:+0300
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0300
DTSTART:20151108T040000
TZNAME:GMT+3
TZOFFSETTO:+0200
RDATE:20151108T040000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
TRANSP:OPAQUE
DTEND;TZID=Europe/Istanbul:20230331T220000
UID:1677664186261-28782@ical.marudot.com
X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-APPLE-RADIUS=141.1748986164913;X
 -APPLE-REFERENCEFRAME=1;X-TITLE="İstanbul Üniversitesi Astronomi ve Uzay
  Bilimleri Bölümü\nİstanbul Üniversitesi ( İÜ ) Beyazıt Kampüsü, Bakirci
 lar Cd. 12, 34116 Fatih Istanbul, Türkiye":geo:41.011220,28.965669
SUMMARY:İstanbul Üniversitesi Astronomi ve Uzay Bilimleri Bölümü Gözlem 
 Gecesi
DTSTART;TZID=Europe/Istanbul:20230331T180000
DTSTAMP:20230301T095047Z
LAST-MODIFIED:20230301T095015Z
LOCATION:İstanbul Üniversitesi Astronomi ve Uzay Bilimleri Bölümü\nİstan
 bul Üniversitesi ( İÜ ) Beyazıt Kampüsü\, Bakircilar Cd. 12\, 34116 Fati
 h Istanbul\, Türkiye
SEQUENCE:0
URL;VALUE=URI:https://astronomi.istanbul.edu.tr/bilimtoplum/program.html
END:VEVENT
END:VCALENDAR
`

export default inviteIcs