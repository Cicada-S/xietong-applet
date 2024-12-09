'use strict'

import getWhatYear from './getWhatYear'
import getWhatQuarter from './getWhatQuarter'
import getWhatMonth from './getWhatMonth'
import getWhatDay from './getWhatDay'
import toStringDate from './toStringDate'
import toDateString from './toDateString'
import now from './now'
import timestamp from './timestamp'
import isValidDate from './isValidDate'
import isDateSame from './isDateSame'
import getWhatWeek from './getWhatWeek'
import getYearDay from './getYearDay'
import getYearWeek from './getYearWeek'
import getMonthWeek from './getMonthWeek'
import getDayOfYear from './getDayOfYear'
import getDayOfMonth from './getDayOfMonth'
import getDateDiff from './getDateDiff'

var dateExports = {
  now: now,
  timestamp: timestamp,
  isValidDate: isValidDate,
  isDateSame: isDateSame,
  toStringDate: toStringDate,
  toDateString: toDateString,
  getWhatYear: getWhatYear,
  getWhatQuarter: getWhatQuarter,
  getWhatMonth: getWhatMonth,
  getWhatWeek: getWhatWeek,
  getWhatDay: getWhatDay,
  getYearDay: getYearDay,
  getYearWeek: getYearWeek,
  getMonthWeek: getMonthWeek,
  getDayOfYear: getDayOfYear,
  getDayOfMonth: getDayOfMonth,
  getDateDiff: getDateDiff
}

export default dateExports
