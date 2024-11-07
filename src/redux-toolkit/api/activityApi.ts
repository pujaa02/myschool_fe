import { AxiosRequestConfig } from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'base-axios';


const ACTIVITY_API_BASE_PATH = '/activities';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getActivities: builder.query<any, AxiosRequestConfig<any>>({
      query: ({ data, ...rest }) => {
        return {
          url: `${ACTIVITY_API_BASE_PATH}/get-data`,
          method: 'POST',
          data,
          extraOptions: { ...rest },
        };
      },
      providesTags: () => {
        return [
          {
            type: 'ACTIVITY',
            id: 'LIST',
          },
        ];
      },
    }),
  }),

  tagTypes: ['ACTIVITY'],
});

export const {
  useLazyGetActivitiesQuery,
  
} = activityApi;
