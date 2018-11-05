'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatEvent;

var _utils = require('../utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
      productId = attributes.productId,
      method = attributes.method,
      uid = attributes.uid,
      sequence = attributes.sequence,
      timestamp = attributes.timestamp,
      start = attributes.start,
      startType = attributes.startType,
      duration = attributes.duration,
      end = attributes.end,
      description = attributes.description,
      url = attributes.url,
      geo = attributes.geo,
      location = attributes.location,
      status = attributes.status,
      categories = attributes.categories,
      organizer = attributes.organizer,
      attendees = attributes.attendees,
      alarms = attributes.alarms,
      recurrenceRule = attributes.recurrenceRule;


  var icsFormat = '';
  icsFormat += 'BEGIN:VCALENDAR\r\n';
  icsFormat += 'VERSION:2.0\r\n';
  icsFormat += 'CALSCALE:GREGORIAN\r\n';
  icsFormat += (0, _utils.foldLine)('PRODID:' + productId) + '\r\n';
  icsFormat += (0, _utils.foldLine)('METHOD:' + method) + '\r\n';
  icsFormat += 'X-PUBLISHED-TTL:PT1H\r\n';
  icsFormat += 'BEGIN:VEVENT\r\n';
  icsFormat += 'UID:' + uid + '\r\n';
  icsFormat += (0, _utils.foldLine)('SUMMARY:' + (title ? (0, _utils.setSummary)(title) : title)) + '\r\n';
  icsFormat += 'DTSTAMP:' + timestamp + '\r\n';

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += 'DTSTART' + (start && start.length == 3 ? ";VALUE=DATE" : "") + ':' + (0, _utils.setDate)(start, startType) + '\r\n';

  // End is not required for all day events on single days (like anniversaries)
  if (!(_lodash2.default.isEqual(start, end) && end && end.length == 3)) {
    if (end && end.length == 3) {
      icsFormat += 'DTEND;VALUE=DATE:' + (0, _utils.setDate)(end, startType) + '\r\n';
    } else if (end) {
      icsFormat += 'DTEND:' + (0, _utils.setDate)(end, startType) + '\r\n';
    }
  }

  icsFormat += sequence ? 'SEQUENCE:' + sequence + '\r\n' : '';
  icsFormat += description ? (0, _utils.foldLine)('DESCRIPTION:' + (0, _utils.setDescription)(description)) + '\r\n' : '';
  icsFormat += url ? (0, _utils.foldLine)('URL:' + url) + '\r\n' : '';
  icsFormat += geo ? (0, _utils.foldLine)('GEO:' + (0, _utils.setGeolocation)(geo)) + '\r\n' : '';
  icsFormat += location ? (0, _utils.foldLine)('LOCATION:' + location) + '\r\n' : '';
  icsFormat += status ? (0, _utils.foldLine)('STATUS:' + status) + '\r\n' : '';
  icsFormat += categories ? (0, _utils.foldLine)('CATEGORIES:' + categories) + '\r\n' : '';
  icsFormat += organizer ? (0, _utils.foldLine)('ORGANIZER;' + (0, _utils.setOrganizer)(organizer)) + '\r\n' : '';

  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += (0, _utils.foldLine)('ATTENDEE;' + (0, _utils.setContact)(attendee)) + '\r\n';
    });
  }

  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += (0, _utils.setAlarm)(alarm);
    });
  }

  icsFormat += recurrenceRule ? 'RRULE:' + recurrenceRule + '\r\n' : '';
  icsFormat += duration ? 'DURATION:' + (0, _utils.formatDuration)(duration) + '\r\n' : '';
  icsFormat += 'END:VEVENT\r\n';
  icsFormat += 'END:VCALENDAR\r\n';

  return icsFormat;
}