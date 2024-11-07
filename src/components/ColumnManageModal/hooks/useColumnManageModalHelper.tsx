// import { useState } from 'react';
// import {
//   DropDownInterface,
//   DropDownValueInterface,
// } from '../types/column.types';
// import { useLazyGetActivityTypesQuery } from 'redux/api/activityTypeApi';
// import {
//   LISTING_DATA_LIMIT,
//   POLLING_INTERVAL,
// } from 'constant/dataLimit.constant';
// import _ from 'lodash';
// import { useLazyGetAllUserQuery } from 'redux/api/userApi';
// import { useLazyGetLeadStatusQuery } from 'redux/api/leadStatusApi';
// import { EntityAttributesEnum } from 'redux/api/entityAttributesApi';
// import { MODULE_PERMISSION } from 'constant/permissions.constant';
// import { useLazyGetPipelinesQuery } from 'redux/api/pipelineApi';
// import { useLazyGetDealStagesQuery } from 'redux/api/dealStageHistoryApi';
// import { useLazyGetTagsQuery } from 'redux/api/tagApi';

// export const useGetDropDownOptions = () => {
//   const [dropDownOptions, setDropDownOptions] = useState<DropDownInterface[]>(
//     []
//   );
//   const [currentPage] = useState(1);

//   const [getActivityTypes] = useLazyGetActivityTypesQuery({
//     pollingInterval: currentPage === 1 ? POLLING_INTERVAL : 0,
//   });
//   const [getLeadDealStatus] = useLazyGetLeadStatusQuery({
//     pollingInterval: currentPage === 1 ? POLLING_INTERVAL : 0,
//   });

//   const [getPipelineAPI] = useLazyGetPipelinesQuery();
//   const [getUsersAPI] = useLazyGetAllUserQuery();

//   const [getDealStages] = useLazyGetDealStagesQuery({});
//   const [getTags] = useLazyGetTagsQuery({});

//   const getUserData = async (): Promise<{ label: string; value: string }[]> => {
//     const data = await getUsersAPI(
//       {
//         params: {
//           limit: 100,
//           page: 1,
//         },
//       },
//       true
//     );
//     return data.data.rows.map((item: any) => {
//       return {
//         label: item.full_name,
//         value: item.id,
//       };
//     });
//   };

//   const getActivityTypeData = async (): Promise<
//     { label: string; value: string }[]
//   > => {
//     const { data } = await getActivityTypes(
//       {
//         data: {
//           query: {
//             page: currentPage,
//             limit: LISTING_DATA_LIMIT,
//             'include[creator][select]': 'username,first_name,last_name',
//             'include[parent_type][select]': 'id,name',
//           },
//         },
//       },
//       true
//     );
//     return data.rows.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.id,
//       };
//     });
//   };

//   const getLeadData = async (
//     type: string
//   ): Promise<{ label: string; value: string }[]> => {
//     const { data } = await getLeadDealStatus(
//       {
//         data: {
//           query: {
//             page: currentPage,
//             limit: LISTING_DATA_LIMIT,
//             ...MODULE_PERMISSION.LEAD.read,
//             'include[creator]': 'id,first_name,last_name,full_name',
//             select: 'id,name,is_system,type,color',
//             sort: '-id',
//             'q[type]': type,
//           },
//         },
//       },
//       true
//     );

//     return data.data.rows.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.id,
//       };
//     });
//   };

//   const getDealPipeline = async (): Promise<
//     { label: string; value: string }[]
//   > => {
//     const data = await getPipelineAPI(
//       {
//         params: {
//           'include[stages][select]': 'id,name,stage_type',
//         },
//       },
//       true
//     );
//     return data.data.rows.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.id,
//       };
//     });
//   };

//   const getAvailabilityData = async (): Promise<
//     { label: string; value: string }[]
//   > => {
//     const data = [
//       {
//         label: 'Free',
//         value: 'Free',
//       },
//       {
//         label: 'Busy',
//         value: 'Busy',
//       },
//     ];

//     return data;
//   };

//   const getDealStagesData = async (): Promise<
//     { label: string; value: string }[]
//   > => {
//     const data = await getDealStages({}, true);

//     return data.data.rows.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.id,
//       };
//     });
//   };

//   const getTagData = async (): Promise<
//     { label: string; value: string }[]
//   > => {
//     const data = await getTags({});
//     return data.data.rows.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.id,
//       };
//     });
//   };

//   const handleUpdateData = async (
//     dropDownType: string,
//     data: DropDownValueInterface[]
//   ) => {
//     setDropDownOptions((prevOptions) => {
//       const newDataArray = _.cloneDeep(prevOptions);
//       const targetDataIndex = _.findIndex(newDataArray, { type: dropDownType });

//       if (targetDataIndex !== -1) {
//         newDataArray[targetDataIndex].value = data;
//       } else {
//         newDataArray.push({
//           type: dropDownType,
//           value: data,
//         });
//       }
//       return newDataArray;
//     });
//   };
//   const setDropDownOptionsData = async (dropDownValueType: string) => {
//     if (dropDownOptions.find((item: any) => item.type === dropDownValueType)) {
//       return;
//     }
//     switch (dropDownValueType) {
//       case 'activity_type':
//         // eslint-disable-next-line no-case-declarations
//         const activityTypeData = await getActivityTypeData();
//         handleUpdateData('activity_type', activityTypeData);
//         break;
//       case 'activities.availability':
//         // eslint-disable-next-line no-case-declarations
//         const availabilityData = await getAvailabilityData();
//         handleUpdateData('activities.availability', availabilityData);
//         break;
//       case 'availability':
//         // eslint-disable-next-line no-case-declarations
//         const availabilityOnlyData = await getAvailabilityData();
//         handleUpdateData('availability', availabilityOnlyData);
//         break;
//       case 'lead_status':
//         // eslint-disable-next-line no-case-declarations
//         const leadStatusData = await getLeadData(
//           EntityAttributesEnum.LEAD_STATUS
//         );
//         handleUpdateData('lead_status_name', leadStatusData);
//         break;
//       case 'lead_temperature':
//         // eslint-disable-next-line no-case-declarations
//         const leadTemperatureData = await getLeadData(
//           EntityAttributesEnum.LEAD_TEMP_STATUS
//         );
//         handleUpdateData('lead_temperature_name', leadTemperatureData);
//         break;
//       case 'pipeline_name':
//         // eslint-disable-next-line no-case-declarations
//         const pipeLineData = await getDealPipeline();
//         handleUpdateData('pipeline_name', pipeLineData);
//         break;
//       case 'stage_name':
//         // eslint-disable-next-line no-case-declarations
//         const stageNameData = await getDealStagesData();
//         handleUpdateData('stage_name', stageNameData);
//         break;
//       case 'associated_tags':
//         // eslint-disable-next-line no-case-declarations
//         const tagData = await getTagData();
//         handleUpdateData('associated_tags', tagData);
//         break;
//       case 'assigned_to':
//       case 'next_due_user':
//       case 'creator':
//       case 'modifier':
//       case 'lead_owner':
//       case 'lead_followers':
//       case 'contact_owner':
//       case 'reporting_to_contact':
//       case 'contact_followers':
//       case 'account_owner':
//       case 'account_followers':
//       case 'activity_followers':
//       case 'completed_by_user':
//         // eslint-disable-next-line no-case-declarations
//         const data = await getUserData();
//         handleUpdateData(dropDownValueType, data);
//         break;
//       default:
//         break;
//     }
//   };

//   const getDropDownOptionsData = async (
//     dropDownValueType: string
//   ): Promise<{ label: string; value: string }[]> => {
//     switch (dropDownValueType) {
//       case 'activity_type':
//         // eslint-disable-next-line no-case-declarations
//         const activityTypeData = await getActivityTypeData();
//         return activityTypeData;
//       case 'activities.availability':
//         // eslint-disable-next-line no-case-declarations
//         const availabilityData = await getAvailabilityData();
//         return availabilityData;
//       case 'availability':
//         // eslint-disable-next-line no-case-declarations
//         const availabilityOnlyData = await getAvailabilityData();
//         return availabilityOnlyData;
//       case 'lead_status':
//         // eslint-disable-next-line no-case-declarations
//         const leadStatusData = await getLeadData(
//           EntityAttributesEnum.LEAD_STATUS
//         );
//         return leadStatusData;
//       case 'lead_temperature':
//         // eslint-disable-next-line no-case-declarations
//         const leadTemperatureData = await getLeadData(
//           EntityAttributesEnum.LEAD_TEMP_STATUS
//         );
//         return leadTemperatureData;
//       case 'pipeline_name':
//         // eslint-disable-next-line no-case-declarations
//         const pipeLineData = await getDealPipeline();
//         return pipeLineData;
//       case 'associated_tags':
//         // eslint-disable-next-line no-case-declarations
//         const tagData = await getTagData();
//         return tagData;
//       case 'stage_name':
//         // eslint-disable-next-line no-case-declarations
//         const stageNameData = await getDealStagesData();
//         return stageNameData;
//       case 'assigned_to':
//       case 'next_due_user':
//       case 'creator':
//       case 'modifier':
//       case 'lead_owner':
//       case 'lead_followers':
//       case 'contact_owner':
//       case 'reporting_to_contact':
//       case 'contact_followers':
//       case 'account_owner':
//       case 'account_followers':
//       case 'activity_followers':
//       case 'completed_by_user':
//         // eslint-disable-next-line no-case-declarations
//         const data = await getUserData();
//         return data;
//       default:
//         return [];
//     }
//   };

//   return {
//     dropDownOptions,
//     setDropDownOptionsData,
//     getDropDownOptionsData,
//   };
// };
