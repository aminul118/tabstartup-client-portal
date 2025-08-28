/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '@/redux/baseApi';

const entrepreneurApi = baseApi.injectEndpoints({
  // Create profile in investor
  endpoints: (build) => ({
    createEntrepreneurProfile: build.mutation({
      query: (payload) => ({
        url: '/entrepreneur-profile/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['ENTREPRENEUR'],
    }),

    // Get all investor
    getAllEntrepreneurProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/entrepreneur-profile/get-all',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['ENTREPRENEUR'],
    }),

    // Get all investor
    getSingleEntrepreneurProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/entrepreneur-profile/single-profile',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['ENTREPRENEUR'],
    }),
  }),
});

export const {
  useCreateEntrepreneurProfileMutation,
  useGetAllEntrepreneurProfileQuery,
  useGetSingleEntrepreneurProfileQuery,
} = entrepreneurApi;
