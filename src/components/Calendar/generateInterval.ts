import { eachDayOfInterval, format } from 'date-fns'
import { MarkedDateProps, DayProps } from "."
import them from "../../styles/theme"
import { getPlatformDate } from '../../utils/getPlatformDate'

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {}
  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
    .forEach((item) => {
      const date = format(getPlatformDate(item), 'yyyy-MM-dd')
      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date
            ? them.colors.main : them.colors.main_light,
          textColor: start.dateString === date || end.dateString === date
            ? them.colors.main_light : them.colors.main,
        }
      }
    });
  return interval
} 