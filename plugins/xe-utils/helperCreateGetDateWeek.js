import setupDefaults from './setupDefaults'

import staticWeekTime from './staticWeekTime'

import isNumber from './isNumber'
import isValidDate from './isValidDate'
import getWhatWeek from './getWhatWeek'

import helperGetDateTime from './helperGetDateTime'

function helperCreateGetDateWeek (getStartDate) {
  return function (date, firstDay) {
    var viewStartDay = isNumber(firstDay) ? firstDay : setupDefaults.firstDayOfWeek
    var targetDate = getWhatWeek(date, 0, viewStartDay, viewStartDay)
    if (isValidDate(targetDate)) {
      var targetOffsetDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())
      var targerStartDate = getStartDate(targetDate)
      var targetFirstDay = targerStartDate.getDay()
      if (targetFirstDay > viewStartDay) {
        targerStartDate.setDate(7 - targetFirstDay + viewStartDay + 1)
      }
      if (targetFirstDay < viewStartDay) {
        targerStartDate.setDate(viewStartDay - targetFirstDay + 1)
      }
      return Math.floor((helperGetDateTime(targetOffsetDate) - helperGetDateTime(targerStartDate)) / staticWeekTime + 1)
    }
    return NaN
  }
}

export default helperCreateGetDateWeek
