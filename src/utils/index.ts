// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { REACT_APP_API_URL } from 'config';
// import {
//   AllCompanyManagerExportObject,
//   AtecoCodeExportObject,
//   CodeExportObject,
//   CompanyExportObject,
//   CompanyManagerAttendeeExportObject,
//   CompanyManagerExportObject,
//   PrivateMembersExportObject,
//   UserManagementExportObject,
// } from 'constants/ExportDataStructure';
// import { format } from 'date-fns';
// import ExcelJS from 'exceljs';
// import saveAs from 'file-saver';
// import { TFunction } from 'i18next';
// import { decode, encode, isValid } from 'js-base64';
// import _ from 'lodash';
// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import sanitizeHtml from 'sanitize-html';
// import tlds from 'tlds';
// import { RoleFields } from 'types/common';

// export const logger = (value: { [key: string]: string }) => {
//   if (process.env.NODE_ENV === 'development') {
//     // eslint-disable-next-line no-console
//     console.error('error------', value?.message ? value?.message : value);
//   }
// };

// export const encodeToBase64 = (data: string, urlSafe = false) => {
//   return encode(data, urlSafe);
// };

// export const decodeFromBase64 = (data: string) => {
//   return isValid(data) ? decode(data) : '';
// };

// export const isValidBase64 = (data: string) => {
//   return isValid(data);
// };

// export const parseData = (data: any) => {
//   try {
//     return JSON.parse(data);
//   } catch (e) {
//     return null;
//   }
// };

// export const checkInputIsNumber = (e: any) => {
//   const k = e.which;
//   if ((k < 48 || k > 57) && (k < 96 || k > 105) && k !== 8) {
//     e.preventDefault();
//     return false;
//   }
// };

// export const isValidEmail = (v: string | null | undefined) => {
//   const tld = (v ?? '').split('.').slice(-1)[0];

//   const isValidTLDs = tlds.includes(tld);
//   if (!isValidTLDs) {
//     return false;
//   }
//   return true;
// };

// export const isValidDomain = (input: string | null | undefined) => {
//   const tld = (input ?? '').split('.').slice(-1)[0];
//   const isValidTLDs = tlds.includes(tld);
//   if (input && input.indexOf('@') === -1 && input.indexOf('.') > 0 && isValidTLDs) {
//     return true;
//   }
//   return false;
// };

// export const isValidDate = (date: string | Date) => {
//   if (typeof date === 'string') {
//     return (
//       Object.prototype.toString.call(new Date(date)).slice(8, -1) === 'Date' &&
//       new Date(date)?.toString() !== 'Invalid Date'
//     );
//   }
//   return date instanceof Date && new Date(date)?.toString() !== 'Invalid Date';
// };

// export const getUrlHostName = (urlString: string) => {
//   try {
//     const url = new URL(urlString);
//     if (url.protocol === 'http:' || url.protocol === 'https:') {
//       return url.hostname;
//     }
//   } catch (error) {
//     return '';
//   }
// };

// export const searchItemFromArray = (data: any[], search: string) => {
//   const searchData = data.filter((obj) => {
//     return JSON.stringify(obj?.template_name || '')
//       .toLocaleLowerCase()
//       .includes(search.trim().toString());
//   });
//   if (_.isArray(searchData)) {
//     return searchData;
//   }
//   return [];
// };

// export const checkAndReturnActualDateOrTime = (val: string) => {
//   const actualDate = format(new Date(val), 'MMM-dd-yyyy');
//   const today = format(new Date(), 'MMM-dd-yyyy');
//   const currentDateYear = new Date().getFullYear();
//   const actualDateYear = new Date(val).getFullYear();

//   if (actualDate === today) {
//     return format(new Date(val), 'h:mm a');
//   }
//   if (currentDateYear === actualDateYear) {
//     return format(new Date(val), 'dd MMM');
//   }
//   return actualDate;
// };

export const customRandomNumberGenerator = (max?: number | null) => {
  if (max) {
    return Math.floor(Math.random() * max) + 1;
  }
  return Math.floor(Math.random() * 10000000) + 1;
};

// export const safeHTML = (string: string, options: sanitizeHtml.IOptions = {}) => {
//   const data = sanitizeHtml(string, options);
//   return data;
// };

export const dasherize = (str: string) => {
  return str
    ?.trim()
    .split(' ')
    .map((value) => value.toLowerCase())
    .join('-');
};

export const convertLocationIdToName = (
  type: string,
  value: string,
  countries: { countries: { id: string; name: string }[] },
  states: { states: { id: string; name: string; country_id: string }[] },
  cities: { cities: { id: string; name: string; state_id: string }[] }
) => {
  switch (type) {
    case 'country':
      return countries.countries.find((obj) => obj.id === value)?.name ?? value;
    case 'state':
      return states.states.find((obj) => obj.id === value)?.name ?? value;
    case 'city':
      return cities.cities.find((obj) => obj.id === value)?.name ?? value;
    default:
      return '';
  }
};

// export function formatCount(count: number) {
//   if (count >= 1000000) {
//     return `${(count / 1000000).toFixed(1)}M`;
//   }
//   if (count >= 1000) {
//     return `${(count / 1000).toFixed(1)}K`;
//   }
//   return count.toString();
// }

// export function useDebounce(value: string, delay: number) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// export const openAuthWindow = (
//   tokenProvider: string,
//   URL?: string,
//   userId?: string,
//   is_default?: boolean
// ): void => {
//   const tokenMapping: Record<string, string> = {
//     google_calendar: 'google',
//     microsoft_calendar: 'microsoft',
//     icalendar: 'icalendar',
//   };

//   const token: string = tokenMapping[tokenProvider] || 'zoom';

//   const authToken: string = window.btoa(
//     JSON.stringify({
//       userId,
//       token_provider: tokenProvider,
//       successURL: URL,
//       failureURL: URL,
//       is_default,
//     })
//   );

//   window.open(
//     `${REACT_APP_API_URL}/auth/${token}/connect?token=${authToken}`,
//     '_self'
//   );
// };

// export const shouldDisableField = (
//   fieldName: string,
//   fieldsArray: string[],
//   activeLanguage: string,
//   defaultLanguage: string
// ) => {
//   if (defaultLanguage === activeLanguage) {
//     return false;
//   }
//   return fieldsArray.indexOf(fieldName) === -1;
// };

// export const replaceTemplateTagsWithBraces = (htmlContent = '') => {
//   return htmlContent.replace(/<%= (.*?) %>/g, '[$1]');
// };

// export const findBraces = (htmlContent = '', braceStrings = ['']) => {
//   const braceCounts: { [key: string]: number } = {};

//   braceStrings.forEach((brace) => {
//     braceCounts[brace] = (
//       htmlContent.match(new RegExp(`\\[${brace}\\]`, 'g')) || []
//     ).length;
//   });
//   return { braceCounts };
// };

// export const replaceBracesWithTemplateTags = (htmlContent = '') => {
//   return htmlContent.replace(/\[(.*?)\]/g, '<%= $1 %>');
// };
// export const capitalizeFirstCharacter = (inputString: string) => {
//   return inputString.charAt(0).toUpperCase() + inputString.slice(1);
// };

export const convertRoleToUrl = (inputString: string) => {
  return inputString
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim()
    .split(' ')
    .join('-');
};

// export const convertRoleUrlToString = (inputString: string) => {
//   return inputString.replace('-', ' ');
// };

// export const convertObjectsToSingleKey = (array: any[]) => {
//   const convertedArray: any[] = [];

//   const extractData = (developer: any, joinKey: any = null) => {
//     let convertedObject: any = {};
//     Object.keys(developer).forEach((key) => {
//       if (typeof developer[key] === 'object') {
//         if (developer[key] && Object?.keys(developer[key])) {
//           const nestedKeys = Object.keys(developer[key]);
//           nestedKeys.forEach((nestedKey) => {
//             if (typeof developer[key] === 'object') {
//               convertedObject = {
//                 ...convertedObject,
//                 ...extractData(developer[key], joinKey ? `${joinKey}.${key}` : key),
//               };
//             } else {
//               convertedObject[`${key}.${nestedKey}`] = developer[key];
//             }
//           });
//         }
//       } else if (joinKey) {
//         convertedObject[`${joinKey}.${key}`] = developer[key];
//       } else {
//         convertedObject[key] = developer[key];
//       }
//     });
//     return convertedObject;
//   };

//   array.forEach((developer) => {
//     convertedArray.push(extractData(developer));
//   });
//   return convertedArray;
// };

// export const wait = (ms = 5000) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// };

// type IHandleExportType = {
//   response?: any;
//   exportFor: string;
//   currentRole?: RoleFields;
// };

// const ExportObject = (
//   type: string,
//   currentRole: RoleFields | undefined,
//   t: TFunction<any, undefined>
// ) => {
//   switch (type) {
//     case 'managers':
//       return CompanyManagerExportObject(t);
//     case 'private':
//       return PrivateMembersExportObject(t);
//     case 'user':
//       return UserManagementExportObject(currentRole, t);
//     case 'attendee':
//       return CompanyManagerAttendeeExportObject(t);
//     case 'company':
//       return CompanyExportObject(t);
//     case 'allManager':
//       return AllCompanyManagerExportObject(t);
//     case 'codes':
//       return CodeExportObject(t);
//     case 'acteo-codes':
//       return AtecoCodeExportObject(t);
//     default:
//       return [];
//   }
// };

// export const useHandleExport = () => {
//   const { t } = useTranslation();
//   const exportDataFunc = async ({
//     response,
//     exportFor,
//     currentRole,
//   }: IHandleExportType) => {
//     let jsonData = [];
//     if (response) {
//       jsonData = convertObjectsToSingleKey(response);
//     }
//     const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('New Sheet');

//     worksheet.columns = ExportObject(exportFor, currentRole, t);
//     if (jsonData) {
//       worksheet.addRows(jsonData);
//     }

//     const updatedExcelBuffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([updatedExcelBuffer], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });
//     saveAs(blob, `${currentRole?.title ?? exportFor}.xlsx`);
//   };
//   return { exportDataFunc };
// };

// export const getObjectKey = (jsonData: any, fieldToConvert?: string[]) => {
//   const allStrings: string[] = [];
//   const stringMap = new Map();

//   // Function to collect all strings
//   function collectStrings(obj: any, parentKey = '') {
//     if (typeof obj === 'string') {
//       if (
//         (!fieldToConvert || fieldToConvert.includes(parentKey)) &&
//         !stringMap.has(parentKey)
//       ) {
//         stringMap.set(parentKey, null);
//         allStrings.push(parentKey);
//       }
//     } else if (Array.isArray(obj)) {
//       obj.forEach((item) => collectStrings(item, parentKey));
//     } else if (obj !== null && typeof obj === 'object') {
//       // collectStrings(value, key)
//       Object.entries(obj).forEach(([key, value]) => {
//         collectStrings(value, key);
//       });
//     }
//   }
//   collectStrings(jsonData);
//   return allStrings;
// };
