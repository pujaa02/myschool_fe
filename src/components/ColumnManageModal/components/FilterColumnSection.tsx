// import React, {
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import { SelectOptionsInterface } from '../types/column.types';
// import {
//   ModuleNames,
//   initialColumnDropdownState,
// } from 'constant/permissions.constant';
// import _ from 'lodash';
// import { debounce } from 'utils/util';
// import Icon from 'components/Icon';

// interface PropsInterface {
//   groupByColumnsData: Record<string, SelectOptionsInterface[]>;
//   onChangeColumnData: (data: SelectOptionsInterface) => void;
//   columOptions: SelectOptionsInterface[];
//   setGroupColumnData: (data: Record<string, SelectOptionsInterface[]>) => void;
//   selectedColumnData?: SelectOptionsInterface;
// }

// const FilterColumnSection = (props: PropsInterface) => {
//   const {
//     groupByColumnsData,
//     onChangeColumnData,
//     selectedColumnData,
//     setGroupColumnData,
//     columOptions,
//   } = props;
//   const [columnDropdownState, setColumnDropdownState] = useState<{
//     [value in ModuleNames]?: boolean;
//   }>(initialColumnDropdownState);

//   useEffect(() => {
//     if (selectedColumnData) {
//       setColumnDropdownState({
//         ...columnDropdownState,
//         [selectedColumnData.model]: true,
//       });
//     }
//   }, [selectedColumnData]);

//   const onHandleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedSearchText = e?.target?.value?.trim()?.toLocaleLowerCase();
//     let searchOutput: SelectOptionsInterface[] = [];
//     if (e?.target?.value === '') {
//       searchOutput = columOptions;
//       setColumnDropdownState({ ...initialColumnDropdownState });
//     } else {
//       searchOutput = columOptions?.slice()?.filter((col: any) => {
//         const columnDisplayName = col?.label?.toLowerCase();
//         const formattedColumnDisplayName = columnDisplayName?.replaceAll(
//           ' ',
//           ''
//         );
//         return (
//           columnDisplayName?.includes(formattedSearchText) ||
//           formattedColumnDisplayName?.includes(formattedSearchText) ||
//           formattedSearchText?.includes(columnDisplayName)
//         );
//       });

//       setColumnDropdownState({
//         ...initialColumnDropdownState,
//         ...searchOutput.reduce((accumulator: any, element: any) => {
//           const item = element?.model;
//           accumulator[item] = true;
//           return accumulator;
//         }, {}),
//       });
//     }
//     setGroupColumnData(_.groupBy(searchOutput, 'model'));
//   };

//   const indexedGroupByColumnData = useMemo(() => {
//     if (Object.keys(groupByColumnsData).length) {
//       return Object.keys(groupByColumnsData)
//         .sort()
//         .map((key, index) => ({
//           key,
//           index,
//         }));
//     }
//     return [];
//   }, [groupByColumnsData]);

//   return (
//     <>
//       <div className="flex flex-wrap px-[20px] h-[calc(100dvh_-_345px)] overflow-y-auto ip__FancyScroll pb-[10px] filter__column__listing">
//         <div
//           className="columns__options w-1/3 pr-[30px]"
//           style={{ width: '100%' }}
//         >
//           <div className="form__Group mb-[10px]">
//             <div className="ip__form__hasIcon">
//               <input
//                 className="ip__input py-[4px] rounded-[8px]"
//                 type="text"
//                 name="search"
//                 onChange={debounce(onHandleSearchChange, 500)}
//                 autoComplete="off"
//               />
//               <Icon
//                 className="grayscale !top-[5px]"
//                 iconType="searchStrokeIcon"
//               />
//             </div>
//           </div>
//           <div className="checkbox__wrapper">
//             {indexedGroupByColumnData?.length ? (
//               indexedGroupByColumnData?.map((data) => {
//                 return (
//                   <ModuleWiseColumnOptionDropdown
//                     key={`ModuleWiseColumnOptionDropdown_${data.index}`}
//                     columnsData={groupByColumnsData?.[data.key]}
//                     modelName={data.key as ModuleNames}
//                     {...{
//                       columnDropdownState,
//                       setColumnDropdownState,
//                       onChangeColumnData,
//                       selectedColumnData,
//                     }}
//                   />
//                 );
//               })
//             ) : (
//               <div className="no__data__wrapper">
//                 <img
//                   className="image"
//                   src="/images/no-data-image.png"
//                   alt="NO DATA FOUND"
//                 />
//                 <h2 className="title">No Result Found</h2>
//                 <p className="text">
//                   We couldn't find what you searched for, <br />
//                   try searching again.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const ModuleWiseColumnOptionDropdown = (props: {
//   columnsData: SelectOptionsInterface[];
//   modelName: ModuleNames;
//   columnDropdownState: { [value in ModuleNames]?: boolean };
//   setColumnDropdownState: Dispatch<
//     SetStateAction<{
//       [value in ModuleNames]?: boolean;
//     }>
//   >;
//   onChangeColumnData: (data: SelectOptionsInterface) => void;
//   selectedColumnData?: SelectOptionsInterface;
// }) => {
//   const {
//     columnsData,
//     modelName,
//     columnDropdownState,
//     setColumnDropdownState,
//     onChangeColumnData,
//     selectedColumnData,
//   } = props;
//   const alias = (val: string) => {
//     switch (val) {
//       case ModuleNames.LEAD:
//         return 'Lead';
//       case ModuleNames.DEAL:
//         return 'Deal';
//       case ModuleNames.ACCOUNT:
//         return 'Account';
//       case ModuleNames.CONTACT:
//         return 'Contacts';
//       case ModuleNames.ACTIVITY:
//         return 'Activity';
//       case ModuleNames.EMAIL:
//         return 'Email';
//       default:
//         return 'Other';
//     }
//   };
//   const sortedData = () => {
//     return columnsData?.slice().sort((a, b) => {
//       const labelA = a?.label?.replace('# ', '') || '';
//       const labelB = b?.label?.replace('# ', '') || '';
//       return labelA.localeCompare(labelB);
//     });
//   };

//   return (
//     <div key={`${modelName}_div`}>
//       <div
//         className={`w-full cursor-pointer duration-300 rounded-[7px] text-[16px] font-biotif__Medium text-primaryColorSD py-[9px] px-[13px] whitespace-pre overflow-hidden text-ellipsis relative before:absolute before:top-[calc(50%_-_1px)] before:translate-y-[-50%] before:right-[13px] before:rotate-[-45deg] inline-block before:w-[8px] before:h-[8px] before:border-l-[2px]  before:border-l-primaryColorSD before:border-b-[2px] before:border-b-primaryColorSD hover:bg-btnGrayColor ${columnDropdownState?.[modelName]
//           ? 'bg-primaryColorSD before:!rotate-[-225deg] before:!top-[50%_+_1px] before:!border-l-[#ffffff] before:!border-b-[#ffffff] !text-[#ffffff] hover:bg-primaryColorSD hover:before:!border-l-[#ffffff] hover:before:!border-b-[#ffffff] hover:!text-[#ffffff]'
//           : ''
//           }`}
//         onClick={() => {
//           setColumnDropdownState((prev) => ({
//             ...columnDropdownState,
//             [modelName]: !prev?.[modelName],
//           }));
//         }}
//       >
//         {alias(modelName)}
//       </div>
//       {
//         columnDropdownState?.[modelName] ? (
//           <div className="checkbox__wrapper">
//             {sortedData()?.map((item, index) => {
//               return (
//                 <div className="ip__Checkbox" key={item?.label}>
//                   <input
//                     className="ip__input rounded-[8px] py-[8]"
//                     name={`${item?.label}-${index}`}
//                     type="checkbox"
//                     checked={selectedColumnData?.value === item.value}
//                     onChange={(e) => {
//                       const isChecked = e.target.checked;
//                       if (isChecked) {
//                         onChangeColumnData(item);
//                       } else {
//                         onChangeColumnData({
//                           ...item,
//                           value: '',
//                         });
//                       }
//                     }}
//                   />
//                   <label className="rc__Label inline-block !w-auto !max-w-full">
//                     {item?.label}
//                   </label>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <></>
//         )
//       }
//     </div >
//   );
// };
// export default FilterColumnSection;
