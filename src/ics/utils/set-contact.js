'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setContact;
function setContact(_ref) {
  var name = _ref.name,
      email = _ref.email,
      rsvp = _ref.rsvp,
      dir = _ref.dir;

  var formattedAttendee = '';
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;';
  formattedAttendee += dir ? 'DIR=' + dir + ';' : '';
  formattedAttendee += 'CN=';
  formattedAttendee += name || 'Unnamed attendee';
  formattedAttendee += email ? ':mailto:' + email : '';

  return formattedAttendee;
}