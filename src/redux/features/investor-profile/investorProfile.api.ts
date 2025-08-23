/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '@/redux/baseApi';

const investorProfileApi = baseApi.injectEndpoints({
  // Create profile in investor
  endpoints: (build) => ({
    createInvestorProfile: build.mutation({
      query: (payload) => ({
        url: '/investor-profile/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['INVESTOR'],
    }),

    // Entrepreneur profile Create
    createEntrepreneurProfile: build.mutation({
      query: (payload) => ({
        url: '/entrepreneur-profile/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['ENTREPRENEUR'],
    }),

    // Get all investor
    getAllInvestorProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/investor-profile/get-all',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['INVESTOR'],
    }),
  }),
});

export const { useCreateInvestorProfileMutation, useGetAllInvestorProfileQuery } =
  investorProfileApi;
