/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '@/redux/baseApi';

const mentorProfileApi = baseApi.injectEndpoints({
  // Create profile in investor
  endpoints: (build) => ({
    createMentorProfile: build.mutation({
      query: (payload) => ({
        url: '/mentor-profile/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['INVESTOR'],
    }),

    getSingleMentorProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/mentor-profile/single-profile',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['MENTOR'],
    }),
  }),
});

export const { useCreateMentorProfileMutation, useGetSingleMentorProfileQuery } = mentorProfileApi;
