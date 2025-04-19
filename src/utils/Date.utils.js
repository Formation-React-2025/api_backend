const {
  format,
  parse,
  startOfDay,
  endOfDay,
} = require('date-fns');

const BACK_FORMAT = "yyyy-MM-dd"
const DATE_STRING_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const startEnd = (data, atStartOfDay, atEndOfDay) => {
  if (atStartOfDay) {
    return startOfDay(data);
  }

  if (atEndOfDay) {
    return endOfDay(data);
  }

  return data;
};

const stringToDate = (dateString, atStartOfDay, atEndOfDay) => {
  const dateTrimed = dateString?.trim() ?? '';
  if (!dateTrimed) {
    return null;
  }

  if (!DATE_STRING_PATTERN.test(dateTrimed)) {
    return null;
  }

  return startEnd(parse(dateTrimed, BACK_FORMAT, new Date()), atStartOfDay, atEndOfDay);
};

const dateToString = (date) => {
  return format(date, BACK_FORMAT);
};

const toString = (data) => {
  if (!data) {
    return null;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (data instanceof Date) {
    return dateToString(data);
  }

  return null;
};

const toDate = (data, atStartOfDay, atEndOfDay) => {
  if (!data) {
    return null;
  }

  if (data instanceof Date) {
    return startEnd(data, atStartOfDay, atEndOfDay);
  }

  if (typeof data === 'string') {
    return stringToDate(data, atStartOfDay, atEndOfDay);
  }

  return null;
};

module.exports = {
  toDate,
  toString,
};
