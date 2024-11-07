// ** Import Packages **1
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'base-axios';

// ** Axios **

const baseQueryApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  tagTypes: ['USER'],
  endpoints: () => ({}),
});

export default baseQueryApi;
