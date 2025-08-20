import baseApi from '@/redux/baseApi';

const applicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateApplication: build.mutation({
      query: ({ userId, updateData }) => ({
        url: `/founder/update-application?userId=${userId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['USER'],
    }),

    //  Update single user
    updateInvestor: build.mutation({
      query: ({ userId, updateData }) => ({
        url: `/investor/investor?userId=${userId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['USER'],
    }),

    // Get single User
    getSingleUser: build.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});

export const { useUpdateApplicationMutation, useGetSingleUserQuery } = applicationApi;
