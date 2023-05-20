import { addDays } from "date-fns";

// export function getPlatformDate(date: Date) : Date{
//   if (Platform.OS === 'ios'){
//     return addDays(date,1)
//   }else{
//     return date;
//   }
// }

export function getPlatformDate(date: Date): Date {
  return addDays(date, 1);
}