/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '@/redux/baseApi';

const investorProfileApi = baseApi.injectEndpoints({
  // Create profile in investor
  endpoints: (build) => ({
    createEntrepreneurProfile: build.mutation({
      query: (data) => {
        return {
          url: `/entrepreneur-profile/create`,
          method: 'POST',
          body: data,
        };
      },
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
  }),
});

export const { useCreateEntrepreneurProfileMutation, useGetAllEntrepreneurProfileQuery } =
  investorProfileApi;
