// import {
//   addMilliseconds,
//   differenceInMilliseconds,
//   format,
//   isToday,
//   isYesterday,
// } from 'date-fns';
// import { zonedTimeToUtc } from 'date-fns-tz';
// import { TFunction } from 'i18next';

// /**
//  * Converts a given date to a UTC ISO string.
//  *
//  * @param {Date} date - The date to convert.
//  * @param {string} timezone - (optional) The timezone to use for the conversion. Defaults to the timezone of the user's browser.
//  * @return {string} The converted date in UTC ISO format.
//  */

// export const convertDateToUTCISOString = (
//   date: Date,
//   timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
// ): string => {
//   const newDate = zonedTimeToUtc(date, timezone);
//   return newDate.toISOString();
// };

// export const dateToMilliseconds = (props: { startDate?: Date; endDate: Date }) => {
//   const { startDate = new Date(), endDate } = props;
//   return differenceInMilliseconds(endDate, startDate);
// };

// /**
//  * Formats a date string based on certain conditions.
//  *
//  * @param {string | undefined} date - The date string to be formatted.
//  * @return {string} The formatted date string.
//  */
// export const getFormattedDate = (date?: string, projectCardDate = false) => {
//   if (date) {
//     const tempDate = new Date(date);
//     // if date passed is same date as today
//     if (isToday(tempDate) && !projectCardDate) {
//       return format(tempDate, 'hh:mm a');
//     }
//     // if date passed is from current year
//     if (new Date().getFullYear() === new Date(tempDate).getFullYear()) {
//       return projectCardDate
//         ? format(tempDate, 'dd/LL/yyyy')
//         : format(tempDate, 'd LLL');
//     }

//     // if date is after the current year
//     return format(tempDate, 'LL/dd/yy');
//   }
//   return '';
// };

// export const getMillisecondsToDate = (milliseconds: number) => {
//   return addMilliseconds(new Date(), milliseconds);
// };

// export const getDateForChat = (
//   date?: string,
//   returnString?: boolean,
//   translateText?: TFunction<'translation'>
// ) => {
//   if (date) {
//     const tempDate = new Date(date);

//     if (isToday(tempDate) && returnString && translateText) {
//       return `${translateText('Chat.todayText')}`;
//     }
//     if (isYesterday(tempDate) && returnString && translateText) {
//       return `${translateText('Chat.yesterDayText')}`;
//     }
//     // format for chat
//     return format(tempDate, 'LLLL d, yyyy');
//   }
// };
