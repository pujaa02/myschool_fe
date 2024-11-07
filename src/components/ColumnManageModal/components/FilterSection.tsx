// /* eslint-disable no-lonely-if */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { v4 as uuidV4 } from 'uuid';
// import Icon from 'components/Icon';
// import {
//   FiltersDataInterface,
//   DropDownInterface,
//   SelectOptionsInterface,
//   SelectedFilterNameInterface,
//   FilterColumnInterface,
// } from '../types/column.types';
// import { useForm } from 'react-hook-form';
// import {
//   FILTER_BOOLEAN_OPTIONS,
//   FILTER_DATE_OPTIONS,
//   FILTER_NUMBER_OPTIONS,
//   FILTER_TEXT_OPTIONS,
//   IN_LAST_OPERATOR,
// } from 'constant';
// import DropDownBox from './DropDownBox';
// import Button from 'components/Button';
// import _ from 'lodash';
// import ReactDatePicker from 'react-datepicker';
// import { reactDatePickerSelectedDate } from 'components/FormField/helper';
// import { startOfDay } from 'date-fns';
// import FilterColumnSection from './FilterColumnSection';
// import {
//   DateRangePickerComponent,
//   PresetDirective,
//   PresetsDirective,
//   RangeEventArgs,
// } from '@syncfusion/ej2-react-calendars';
// import { DATE_PRESET } from 'components/EntityDetails/Timeline/constant/timelineField.constant';
// import { useGetDropDownOptions } from '../hooks/useColumnManageModalHelper';
// import { isShowDropDown } from 'utils/util';
// import { format as Format } from 'date-fns-tz';
// import { setAppliedFilter } from 'redux/slices/commonSlice';
// import { useDispatch } from 'react-redux';
// import Modal from 'components/Modal';

// interface PropsInterface {
//   columOptions: SelectOptionsInterface[];
//   filtersData: FiltersDataInterface;
//   HandleClearFilter?: () => void;
//   isFilterFromViewList?: boolean;
//   columnSectionData: SelectedFilterNameInterface;
//   setColumnSectionData: React.Dispatch<
//     React.SetStateAction<SelectedFilterNameInterface>
//   >;
//   setFiltersData: (value: FiltersDataInterface) => void;
//   setIsDirty?: (value: boolean) => void;
//   onHandleSaveData?: () => void;
//   HandleRemoveFilterSection?: () => void;
//   initialFilterError?: boolean;
// }
// interface GetDropDownOptionsResult {
//   dropDownOptions: DropDownInterface[];
//   setDropDownOptionsData: (dropDownValueType: string) => void;
//   getDropDownOptionsData: (
//     dropDownValueType: string
//   ) => Promise<{ label: string; value: string }[]>;
// }

// const FilterSection = (props: PropsInterface) => {
//   const {
//     columOptions = [],
//     filtersData,
//     columnSectionData,
//     setFiltersData,
//     setIsDirty,
//     setColumnSectionData,
//     HandleClearFilter,
//     isFilterFromViewList,
//     initialFilterError,
//     onHandleSaveData,
//     HandleRemoveFilterSection
//   } = props;

//   const [groupColumnOptions, setGroupColumnOptions] = useState<
//     Record<string, SelectOptionsInterface[]>
//   >({});
//   const [editDropDownOptionsData, setEditDropDownOptionsData] = useState<
//     DropDownInterface[]
//   >([]);
//   // const [isFirstTime, setIsFirstTime] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

//   // ** Hooks **
//   const dispatch = useDispatch();
//   const { control } = useForm();
//   useEffect(() => {
//     if (!filtersData?.filterType && columOptions?.length > 0) {
//       setFiltersData({
//         filterType: 'and',
//         filter: [],
//       });
//     }
//   }, [columOptions]);

//   const {
//     dropDownOptions,
//     setDropDownOptionsData,
//     getDropDownOptionsData,
//   }: GetDropDownOptionsResult = useGetDropDownOptions();

//   useEffect(() => {
//     if (
//       filtersData &&
//       filtersData?.filter &&
//       filtersData?.filter?.length > 0
//       // isFirstTime
//     ) {
//       filtersData?.filter?.forEach((filter) => {
//         filter?.filter?.forEach((item) => {
//           if (dropDownCondition(item)) {
//             const value = (
//               editDropDownOptionsData.find(
//                 (ditem: any) => ditem.type === item?.columnName
//               ) || {}
//             )?.value;
//             if (!value) {
//               getDropDownOptionValue(item?.columnName);
//             }
//           }
//         });
//       });
//       // setIsFirstTime(false);
//     }
//   }, [filtersData]);

//   const onHandleAddFilter = () => {
//     if (setIsDirty) setIsDirty(true);
//     if (filtersData?.filter && filtersData?.filter?.length > 0) {
//       setFiltersData({
//         ...filtersData,
//         filter: [
//           ...filtersData.filter,
//           {
//             filterType: 'and',
//             filter: [
//               {
//                 columnName: '',
//                 columnType: '',
//                 value: '',
//                 displayName: '',
//                 type: 'eq',
//                 selectedTypeDisplayName: 'Equals',
//               },
//             ],
//           },
//         ],
//       });
//     } else {
//       setFiltersData({
//         filterType: 'and',
//         filter: [
//           {
//             filterType: 'and',
//             filter: [
//               {
//                 columnName: '',
//                 columnType: '',
//                 displayName: '',
//                 value: '',
//                 type: 'eq',
//                 selectedTypeDisplayName: 'Equals',
//               },
//             ],
//           },
//         ],
//       });
//     }
//   };

//   const onHandleChangeSelect = (
//     value: string,
//     filedName:
//       | 'type'
//       | 'columnName'
//       | 'value'
//       | 'subType'
//       | 'subValue'
//       | 'selectedvalue',
//     index: number,
//     subIndex: number,
//     columnType?: string,
//     options?: {
//       searchKeys?: string[];
//       includeObj?: Record<string, any>;
//       foreignKey?: string;
//       dropDownSearchKey?: string;
//     },
//     foreignKey?: string,
//     label?: string,
//     selectedValueDisplayName?: string,
//     selectedTypeDisplayName?: string
//   ) => {
//     if (setIsDirty) setIsDirty(true);
//     setFiltersData({
//       ...filtersData,
//       filter: filtersData?.filter?.map((filter, fIndex) => {
//         if (index === fIndex) {
//           const filterData = filter?.filter?.map((item, iIndex) => {
//             setDropDownOptionsData(value);
//             if (subIndex === iIndex) {
//               if (filedName === 'columnName') {
//                 return {
//                   ...item,
//                   [filedName]: value,
//                   type: 'eq',
//                   searchKeys: options?.searchKeys,
//                   includeObj: options?.includeObj,
//                   columnType: columnType || '',
//                   foreignKey: foreignKey || '',
//                   displayName: label,
//                   errorType: value ? '' : 'Field is required',
//                   dropDownSearchKey: options?.dropDownSearchKey,
//                   selectedValueDisplayName: '',
//                   value: '',
//                   selectedvalue: '',
//                 };
//               }
//               if (filedName === 'selectedvalue') {
//                 return {
//                   ...item,
//                   searchKeys: options?.searchKeys,
//                   includeObj: options?.includeObj,
//                   foreignKey: options?.foreignKey,
//                   [filedName]: value,
//                   selectedValueDisplayName: selectedValueDisplayName ?? '',
//                   errorValue: value ? '' : 'Field is required',
//                   dropDownSearchKey: options?.dropDownSearchKey,
//                 };
//               }
//               if (filedName === 'type') {
//                 return {
//                   ...item,
//                   searchKeys: options?.searchKeys,
//                   includeObj: options?.includeObj,
//                   foreignKey: options?.foreignKey,
//                   [filedName]: value,
//                   selectedTypeDisplayName: selectedTypeDisplayName ?? '',
//                   errorType: '',
//                   errorValue: '',
//                   dropDownSearchKey: options?.dropDownSearchKey,
//                   selectedValueDisplayName: '',
//                   selectedvalue: '',
//                   value: '',
//                 };
//               }
//               return {
//                 ...item,
//                 searchKeys: options?.searchKeys,
//                 includeObj: options?.includeObj,
//                 foreignKey: options?.foreignKey,
//                 [filedName]: value,
//                 errorValue: value ? '' : 'Field is required',
//                 selectedValueDisplayName: selectedValueDisplayName ?? '',
//                 dropDownSearchKey: options?.dropDownSearchKey,
//               };
//             }
//             return item;
//           });
//           return {
//             ...filter,
//             filter: filterData,
//           };
//         }
//         return filter;
//       }),
//     });
//   };

//   const onHandleAddItem = (index: number) => {
//     if (
//       filtersData?.filter &&
//       filtersData?.filter?.[index] &&
//       filtersData?.filter?.[index]?.filter?.length > 0
//     ) {
//       if (setIsDirty) setIsDirty(true);
//       const newData = _.cloneDeep(filtersData?.filter[index]);
//       newData?.filter.push({
//         columnName: '',
//         columnType: '',
//         value: '',
//         type: 'eq',
//         selectedTypeDisplayName: 'Equals',
//       });
//       setFiltersData({
//         ...filtersData,
//         filter: filtersData?.filter?.map((filter, i) => {
//           if (index === i) {
//             return newData;
//           }
//           return filter;
//         }),
//       });
//     }
//   };

//   const onHandleDeleteItem = (index: number, innerIndex: number) => {
//     if (
//       filtersData?.filter &&
//       filtersData?.filter?.[index] &&
//       filtersData?.filter?.[index]?.filter?.length > 0
//     ) {
//       const newData = _.cloneDeep(filtersData?.filter[index]);
//       newData?.filter.splice(innerIndex, 1);
//       if (setIsDirty) setIsDirty(true);
//       setFiltersData({
//         ...filtersData,
//         filter: filtersData?.filter?.map((filter, i) => {
//           if (index === i) {
//             return newData;
//           }
//           return filter;
//         }),
//       });
//     }
//   };

//   const onHandleDeleteFilterSection = (index: number) => {
//     if (isFilterFromViewList) {
//       if (index === 0) {
//         if (filtersData && filtersData?.filter?.[index]) {
//           const updatedFilterArray = [
//             ...filtersData.filter.slice(0, index),
//             ...filtersData.filter.slice(index + 1),
//           ];
//           const updatedFiltersData = {
//             ...filtersData,
//             filter: updatedFilterArray,
//           };
//           setFiltersData(updatedFiltersData);
//         }
//         if (HandleRemoveFilterSection) {
//           HandleRemoveFilterSection()
//         }
//       } else {
//         if (filtersData && filtersData?.filter?.[index]) {
//           const updatedFilterArray = [
//             ...filtersData.filter.slice(0, index),
//             ...filtersData.filter.slice(index + 1),
//           ];
//           const updatedFiltersData = {
//             ...filtersData,
//             filter: updatedFilterArray,
//           };
//           setFiltersData(updatedFiltersData);
//         }
//       }
//     } else {
//       if (filtersData && filtersData?.filter?.[index]) {
//         const updatedFilterArray = [
//           ...filtersData.filter.slice(0, index),
//           ...filtersData.filter.slice(index + 1),
//         ];
//         const updatedFiltersData = {
//           ...filtersData,
//           filter: updatedFilterArray,
//         };
//         setFiltersData(updatedFiltersData);
//       }
//     }
//   };

//   const onHandleChangeOption = (option: 'and' | 'or', index: number) => {
//     if (setIsDirty) {
//       setIsDirty(true);
//     }

//     if (index > -1) {
//       setFiltersData({
//         ...filtersData,
//         filter: filtersData.filter?.map((filter, i) => {
//           if (index === i) {
//             return {
//               ...filter,
//               filterType: option,
//             };
//           }
//           return filter;
//         }),
//       });
//     } else {
//       setFiltersData({
//         ...filtersData,
//         filterType: option,
//       });
//     }
//   };
//   const onClearFilters = async () => {
//     if (isFilterFromViewList) {
//       if (HandleClearFilter) {
//         HandleClearFilter();
//       }
//     } else {
//       if (setIsDirty) setIsDirty(true);
//       if (HandleClearFilter) {
//         HandleClearFilter();
//       }
//     }
//   };

//   const isShowField = (type: string) => {
//     return (
//       [
//         'eq',
//         'gt',
//         'gte',
//         'lte',
//         'lt',
//         'ne',
//         'inrange',
//         'notinrange',
//         'iLike',
//         'notILike',
//         'iStartsWith',
//         'iEndsWith',
//         'startsWith',
//         'endsWith',
//       ].indexOf(type) !== -1
//     );
//   };
//   const getDropDownOptionValue = (columnName: string) => {
//     getDropDownOptionsData(columnName).then((data) => {
//       setEditDropDownOptionsData((prevData) => {
//         const newData = {
//           type: columnName,
//           value: data,
//         };

//         const existingItemIndex = prevData.findIndex(
//           (item) => item.type === columnName
//         );

//         if (existingItemIndex !== -1) {
//           return prevData.map((item, index) => {
//             if (index === existingItemIndex) {
//               return newData;
//             }
//             return item;
//           });
//         }
//         return [...prevData, newData];
//       });
//     });
//   };
//   useEffect(() => {
//     setGroupColumnOptions(_.groupBy(columOptions, 'model'));
//   }, [columOptions]);

//   const dropDownCondition = (item: FilterColumnInterface) => {
//     return (
//       ['JSONTYPE', 'STRING', 'BelongsTo', 'HasMany', 'BOOLEAN'].includes(
//         item?.columnType
//       ) &&
//       (item?.type === 'eq' ||
//         item?.type === 'ne' ||
//         item?.type === 'iLike' ||
//         item?.type === 'notILike') &&
//       isShowDropDown(item?.columnName)
//     );
//   };

//   return (
//     <>
//       {/* <div className='min-h-[350px]'>
//        */}
//       <div
//         className={`${isCalendarOpen && !isFilterFromViewList ? 'min-h-[350px]' : ''
//           }`}
//       >
//         <h3
//           className={`relative text-darkTextColorSD font-biotif__Medium text-[16px] mb-[8px] ${columnSectionData.isShow ? 'pl-[30px]' : ''
//             } `}
//         >
//           Filter
//           {columnSectionData.isShow && (
//             <span
//               className='absolute top-[calc(50%_-_2px)] translate-y-[-50%] left-0 w-[26px] h-[26px] rounded-[4px] before:content-[""] before:w-[12px] before:h-[2px] before:bg-sdBlack__bg before:z-[2] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] after:content-[""] after:absolute after:top-[9px] after:left-[7px] after:w-[8px] after:h-[8px] after:border-l-[2px] after:border-b-[2px] after:border-l-[#000000] after:border-b-[#000000] after:rotate-45 hover:bg-btnGrayColor'
//               onClick={() => {
//                 setColumnSectionData({
//                   ...columnSectionData,
//                   isShow: false,
//                 });
//               }}
//             />
//           )}
//         </h3>
//         {!columnSectionData?.isShow ? (
//           <>
//             {filtersData?.filter?.map((filter, index) => {
//               return (
//                 <React.Fragment key={index}>
//                   <div className="border-[1px] border-dashed border-[#CCC]/90 rounded-[10px] py-[6px] px-[13px] mt-[10px] first:mt-0 relative">
//                     <div>
//                       <Icon
//                         iconType="closeBtnFilled"
//                         className="absolute top-[-16px] right-[-14px] rotate-45 bg-[#fff] rounded-full cursor-pointer w-[32px] h-[32px] shrink-0 duration-300 rounded-[5px] before:content-[''] before:w-[11px] before:h-[1px] before:bg-black before:absolute before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] after:content-[''] after:w-[1px] after:h-[11px] after:bg-black after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] hover:bg-[#f0f0f0]"
//                         onClick={() => {
//                           onHandleDeleteFilterSection(index);
//                         }}
//                       />
//                     </div>
//                     {filter?.filter?.map((item, i: number) => (
//                       <React.Fragment key={i}>
//                         <div
//                           key={i}
//                           className="filters__row flex flex-wrap items-center mt-[10px] first:mt-0"
//                         >
//                           <div className="flex flex-wrap mx-[-5px] w-[calc(100%_-_24px)] pr-[10px]">
//                             <div className="px-[5px] w-1/3 mb-[8px]">
//                               <input
//                                 placeholder="Select Field Name"
//                                 className="ip__input"
//                                 type="text"
//                                 onClick={() => {
//                                   if (isFilterFromViewList) {
//                                     setColumnSectionData({
//                                       ...columnSectionData,
//                                       isShow: false,
//                                       index,
//                                       subIndex: i,
//                                       value: columOptions?.find(
//                                         (option) =>
//                                           option?.value === item?.columnName
//                                       ),
//                                     });
//                                     if (setIsDirty) setIsDirty(true);
//                                     setIsOpen(true);
//                                   } else {
//                                     setColumnSectionData({
//                                       ...columnSectionData,
//                                       isShow: true,
//                                       index,
//                                       subIndex: i,
//                                       value: columOptions?.find(
//                                         (option) =>
//                                           option?.value === item?.columnName
//                                       ),
//                                     });
//                                     if (setIsDirty) setIsDirty(true);
//                                   }
//                                 }}
//                                 value={
//                                   item?.columnName
//                                     ? columOptions?.find(
//                                       (option) =>
//                                         option?.value === item?.columnName
//                                     )?.label
//                                     : ''
//                                 }
//                               />
//                               {item.errorType && (
//                                 <p className="ip__Error">*{item.errorType}</p>
//                               )}
//                             </div>
//                             <div className="px-[5px] w-1/3 mb-[8px]">
//                               <DropDownBox
//                                 wrapperClass="mb-0"
//                                 placeholder="Select Type"
//                                 type="select"
//                                 name={`select_type_${index}-${uuidV4()}`}
//                                 id={`select_type_${index}-${uuidV4()}`}
//                                 labelClass="if__label__blue"
//                                 control={control}
//                                 options={
//                                   item?.columnType === 'INTEGER' ||
//                                     item?.columnType === 'FLOAT'
//                                     ? FILTER_NUMBER_OPTIONS
//                                     : item?.columnType === 'BOOLEAN'
//                                       ? FILTER_BOOLEAN_OPTIONS
//                                       : item?.columnType === 'DATE'
//                                         ? FILTER_DATE_OPTIONS
//                                         : FILTER_TEXT_OPTIONS
//                                 }
//                                 onChange={(selectedOption) => {
//                                   const selectedOptionLabel =
//                                     item?.columnType === 'INTEGER' ||
//                                       item?.columnType === 'FLOAT'
//                                       ? FILTER_NUMBER_OPTIONS.find(
//                                         (sitem) =>
//                                           sitem.value ===
//                                           selectedOption.toString()
//                                       )?.label
//                                       : item?.columnType === 'DATE'
//                                         ? FILTER_DATE_OPTIONS.find(
//                                           (sitem) =>
//                                             sitem.value ===
//                                             selectedOption.toString()
//                                         )?.label
//                                         : FILTER_TEXT_OPTIONS.find(
//                                           (sitem) =>
//                                             sitem.value ===
//                                             selectedOption.toString()
//                                         )?.label;

//                                   onHandleChangeSelect(
//                                     selectedOption.toString(),
//                                     'type',
//                                     index,
//                                     i,
//                                     '',
//                                     item,
//                                     '',
//                                     '',
//                                     '',
//                                     selectedOptionLabel
//                                   );
//                                 }}
//                                 value={item?.type}
//                                 menuPosition="fixed"
//                                 menuPlacement="auto"
//                               />
//                             </div>
//                             <div className="px-[5px] w-1/3 mb-[8px]">
//                               <div className="form__Group mb-0">
//                                 <div className="">
//                                   {isShowField(item?.type) ? (
//                                     item?.columnType === 'DATE' ? (
//                                       item?.type === 'inrange' ||
//                                         item?.type === 'notinrange' ? (
//                                         <DateRangePickerComponent
//                                           strictMode
//                                           onChange={(args: RangeEventArgs) => {
//                                             if (
//                                               Array.isArray(args.value) &&
//                                               args.value.length >= 2 &&
//                                               args.value[0] instanceof Date &&
//                                               args.value[1] instanceof Date
//                                             ) {
//                                               onHandleChangeSelect(
//                                                 `${args.value[0].toISOString()}_${args.value[1].toISOString()}`,
//                                                 'value',
//                                                 index,
//                                                 i,
//                                                 '',
//                                                 item,
//                                                 '',
//                                                 '',
//                                                 `${Format(
//                                                   args.value[0],
//                                                   'MM-dd-yyyy'
//                                                 )}_${Format(
//                                                   args.value[1],
//                                                   'MM-dd-yyyy'
//                                                 )}`
//                                               );
//                                             }
//                                           }}
//                                           startDate={reactDatePickerSelectedDate(
//                                             item.value.split('_')[0]
//                                           )}
//                                           endDate={reactDatePickerSelectedDate(
//                                             item.value.split('_')[1]
//                                           )}
//                                         >
//                                           <PresetsDirective>
//                                             {DATE_PRESET.map((date, key) => (
//                                               <PresetDirective
//                                                 key={`${key}_preset`}
//                                                 label={date.label}
//                                                 start={date.start}
//                                                 end={date.end}
//                                               />
//                                             ))}
//                                           </PresetsDirective>
//                                         </DateRangePickerComponent>
//                                       ) : (
//                                         <ReactDatePicker
//                                           onCalendarOpen={() => {
//                                             setIsCalendarOpen(true);
//                                           }}
//                                           onCalendarClose={() => {
//                                             setIsCalendarOpen(false);
//                                           }}
//                                           isClearable
//                                           dateFormat="MM-dd-yyyy"
//                                           onChange={(e) => {
//                                             if (e) {
//                                               onHandleChangeSelect(
//                                                 startOfDay(
//                                                   e || new Date()
//                                                 ).toISOString(),
//                                                 'value',
//                                                 index,
//                                                 i,
//                                                 '',
//                                                 item,
//                                                 '',
//                                                 '',
//                                                 Format(
//                                                   e || new Date(),
//                                                   'MM-dd`-yyyy'
//                                                 )
//                                               );
//                                             } else {
//                                               onHandleChangeSelect(
//                                                 '',
//                                                 'value',
//                                                 index,
//                                                 i,
//                                                 '',
//                                                 item,
//                                                 '',
//                                                 '',
//                                                 ''
//                                               );
//                                             }
//                                           }}
//                                           selected={reactDatePickerSelectedDate(
//                                             item.value
//                                           )}
//                                           placeholderText="MM-dd-yyyy"
//                                           scrollableYearDropdown
//                                           scrollableMonthYearDropdown
//                                           dropdownMode="select"
//                                         />
//                                       )
//                                     ) : dropDownCondition(item) ? (
//                                       <>
//                                         <DropDownBox
//                                           wrapperClass="mb-0"
//                                           placeholder="Select Value"
//                                           type="select"
//                                           name={`select_sub_value_${index}-${uuidV4()}`}
//                                           id={`select_sub_value_${index}-${uuidV4()}`}
//                                           labelClass="if__label__blue"
//                                           control={control}
//                                           options={
//                                             dropDownOptions.find(
//                                               (ditem: any) =>
//                                                 ditem.type === item?.columnName
//                                             )?.value
//                                               ? dropDownOptions.find(
//                                                 (ditem: any) =>
//                                                   ditem.type ===
//                                                   item?.columnName
//                                               )?.value
//                                               : (
//                                                 editDropDownOptionsData.find(
//                                                   (ditem: any) =>
//                                                     ditem.type ===
//                                                     item?.columnName
//                                                 ) || {}
//                                               )?.value
//                                           }
//                                           onChange={(selectedOption) => {
//                                             if (Array.isArray(selectedOption)) {
//                                               onHandleChangeSelect(
//                                                 selectedOption
//                                                   .map((option) => option.value)
//                                                   .join(','),
//                                                 'selectedvalue',
//                                                 index,
//                                                 i,
//                                                 '',
//                                                 item,
//                                                 '',
//                                                 '',
//                                                 selectedOption
//                                                   .map((option) => option.label)
//                                                   .join(',')
//                                               );
//                                             }
//                                           }}
//                                           value={item?.selectedvalue}
//                                           isMulti
//                                           menuPosition="fixed"
//                                           menuPlacement="auto"
//                                         />
//                                       </>
//                                     ) : item?.columnType === 'BOOLEAN' ? (
//                                       <DropDownBox
//                                         wrapperClass="mb-0"
//                                         placeholder="Select Type"
//                                         type="select"
//                                         name={`select_type_${index}-${uuidV4()}`}
//                                         id={`select_type_${index}-${uuidV4()}`}
//                                         labelClass="if__label__blue"
//                                         control={control}
//                                         options={[
//                                           {
//                                             label: 'Yes',
//                                             value: 'yes',
//                                           },
//                                           { label: 'No', value: 'no' },
//                                         ]}
//                                         onChange={(selectedOption) => {
//                                           onHandleChangeSelect(
//                                             selectedOption.toString() === 'yes'
//                                               ? '1'
//                                               : '0',
//                                             'value',
//                                             index,
//                                             i,
//                                             '',
//                                             item,
//                                             '',
//                                             '',
//                                             selectedOption.toString()
//                                           );
//                                         }}
//                                         value={item?.selectedValueDisplayName}
//                                         menuPosition="fixed"
//                                         menuPlacement="auto"
//                                       />
//                                     ) : (
//                                       <input
//                                         placeholder={
//                                           item.columnName === 'duration'
//                                             ? 'Minutes...'
//                                             : 'Filter...'
//                                         }
//                                         className="ip__input"
//                                         type={
//                                           item.columnType === 'INTEGER'
//                                             ? 'number'
//                                             : 'text'
//                                         }
//                                         value={item.value}
//                                         onChange={(
//                                           e: React.ChangeEvent<HTMLInputElement>
//                                         ) => {
//                                           onHandleChangeSelect(
//                                             e?.target?.value.toString(),
//                                             'value',
//                                             index,
//                                             i,
//                                             '',
//                                             item
//                                           );
//                                         }}
//                                       />
//                                     )
//                                   ) : null}
//                                 </div>
//                               </div>
//                               {item.errorValue && (
//                                 <p className="ip__Error">*{item.errorValue}</p>
//                               )}
//                             </div>
//                             {item?.type === 'inlast' && (
//                               <>
//                                 <div className="px-[5px] w-1/3 mb-[8px]">
//                                   <input
//                                     placeholder="Value..."
//                                     className="ip__input"
//                                     type="number"
//                                     value={item?.subValue}
//                                     onChange={(
//                                       e: React.ChangeEvent<HTMLInputElement>
//                                     ) => {
//                                       onHandleChangeSelect(
//                                         e?.target?.value.toString(),
//                                         'subValue',
//                                         index,
//                                         i,
//                                         '',
//                                         item
//                                       );
//                                     }}
//                                   />
//                                 </div>
//                                 <div className="px-[5px] w-1/3 mb-[8px">
//                                   <DropDownBox
//                                     wrapperClass="mb-0"
//                                     placeholder="Select Type"
//                                     type="select"
//                                     name={`select_sub_type_${index}-${uuidV4()}`}
//                                     id={`select_sub_type_${index}-${uuidV4()}`}
//                                     labelClass="if__label__blue"
//                                     control={control}
//                                     options={IN_LAST_OPERATOR}
//                                     onChange={(selectedOption) =>
//                                       onHandleChangeSelect(
//                                         selectedOption.toString(),
//                                         'subType',
//                                         index,
//                                         i,
//                                         '',
//                                         item
//                                       )
//                                     }
//                                     value={item?.subType}
//                                     menuPosition="fixed"
//                                     menuPlacement="auto"
//                                   />
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                           {filter?.filter?.length === i + 1 ? (
//                             <div
//                               onClick={() => {
//                                 onHandleAddItem(index);
//                               }}
//                               className="relative cursor-pointer w-[32px] h-[32px] shrink-0 duration-300 rounded-[5px] before:content-[''] before:w-[11px] before:h-[1px] before:bg-black before:absolute before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] after:content-[''] after:w-[1px] after:h-[11px] after:bg-black after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] hover:bg-[#f0f0f0] mb-[8px]"
//                             />
//                           ) : (
//                             <Icon
//                               onClick={() => onHandleDeleteItem(index, i)}
//                               className="delete__btn w-[32px] h-[32px] p-[8px] cursor-pointer rounded-[6px] duration-300 hover:bg-[#F1F1F1]"
//                               iconType="deleteFilled"
//                             />
//                           )}
//                         </div>
//                         {filter?.filter?.length !== i + 1 && (
//                           <div className="custom__radio__wrapper flex items-center justify-center mt-[10px] first:mt-0">
//                             <div className="ip__Radio mr-[15px]">
//                               <input
//                                 type="radio"
//                                 name={`inner-filter-option-${index}-${uuidV4()}`}
//                                 value="and"
//                                 checked={filter?.filterType === 'and'}
//                                 onChange={() =>
//                                   onHandleChangeOption('and', index)
//                                 }
//                               />
//                               <label className="rc__Label">AND</label>
//                             </div>
//                             <div className="ip__Radio">
//                               <input
//                                 type="radio"
//                                 name={`inner-filter-option-${index}-${uuidV4()}`}
//                                 value="or"
//                                 checked={filter?.filterType === 'or'}
//                                 onChange={() =>
//                                   onHandleChangeOption('or', index)
//                                 }
//                               />
//                               <label className="rc__Label">OR</label>
//                             </div>
//                           </div>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </div>
//                   {filtersData?.filter?.length !== index + 1 && (
//                     <div className="custom__radio__wrapper flex items-center justify-center mt-[10px] first:mt-0">
//                       <div className="ip__Radio mr-[15px]">
//                         <input
//                           type="radio"
//                           name={`filter-option-${index}-${uuidV4()}`}
//                           id={`filter-option-${index}-${uuidV4()}`}
//                           value="and"
//                           checked={filtersData?.filterType === 'and'}
//                           onChange={() => onHandleChangeOption('and', -1)}
//                         />
//                         <label className="rc__Label">AND</label>
//                       </div>
//                       <div className="ip__Radio">
//                         <input
//                           type="radio"
//                           name={`filter-option-${index}-${uuidV4()}`}
//                           id={`filter-option-${index}-${uuidV4()}`}
//                           value="or"
//                           checked={filtersData?.filterType === 'or'}
//                           onChange={() => onHandleChangeOption('or', -1)}
//                         />
//                         <label className="rc__Label">OR</label>
//                       </div>
//                     </div>
//                   )}
//                 </React.Fragment>
//               );
//             })}
//             <span className="flex justify-between mt-5 add__clear__btn__wrapper">
//               <button
//                 onClick={onHandleAddFilter}
//                 className="add__btn text-[#7467B7] text-[14px] font-biotif__Medium duration-300 mt-[10px] hover:text-[#6054A0]"
//               >
//                 + Add Filter
//               </button>
//               {filtersData?.filter && filtersData?.filter?.length > 0 && (
//                 <Button
//                   type="button"
//                   onClick={() => onClearFilters()}
//                   className="i__Button outline__Btn__SD smaller clear__btn"
//                 >
//                   Clear
//                 </Button>
//               )}
//             </span>
//             {initialFilterError && (
//               <p className="ip__Error">*Please apply atleast one filter</p>
//             )}
//           </>
//         ) : (
//           <>
//             {!isFilterFromViewList && (
//               <FilterColumnSection
//                 groupByColumnsData={groupColumnOptions}
//                 selectedColumnData={columnSectionData.value}
//                 columOptions={columOptions}
//                 setGroupColumnData={setGroupColumnOptions}
//                 onChangeColumnData={(data: SelectOptionsInterface) => {
//                   onHandleChangeSelect(
//                     data.value,
//                     'columnName',
//                     columnSectionData.index,
//                     columnSectionData.subIndex,
//                     data.type,
//                     data,
//                     data.foreignKey,
//                     data.label
//                   );
//                   setColumnSectionData({
//                     isShow: false,
//                     index: 0,
//                     subIndex: 0,
//                   });
//                   setGroupColumnOptions(_.groupBy(columOptions, 'model'));
//                 }}
//               />
//             )}
//           </>
//         )}
//         {isOpen && (
//           <Modal
//             title="Filter"
//             visible={!columnSectionData?.isShow}
//             modalWrapperClass="ip__Modal__Wrapper__new manage__column__modal filterView__column__modal"
//             onClose={() => setIsOpen(false)}
//             onCancel={() => setIsOpen(false)}
//           >
//             <FilterColumnSection
//               groupByColumnsData={groupColumnOptions}
//               selectedColumnData={columnSectionData.value}
//               columOptions={columOptions}
//               setGroupColumnData={setGroupColumnOptions}
//               onChangeColumnData={(data: SelectOptionsInterface) => {
//                 onHandleChangeSelect(
//                   data.value,
//                   'columnName',
//                   columnSectionData.index,
//                   columnSectionData.subIndex,
//                   data.type,
//                   data,
//                   data.foreignKey,
//                   data.label
//                 );
//                 setColumnSectionData({
//                   isShow: false,
//                   index: 0,
//                   subIndex: 0,
//                 });
//                 setGroupColumnOptions(_.groupBy(columOptions, 'model'));
//                 if (!columnSectionData.isShow) {
//                   setIsOpen(false);
//                 }
//               }}
//             />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// };

// export default FilterSection;
