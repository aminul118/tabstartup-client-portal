/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '@/redux/baseApi';

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (data) => {
        return {
          url: `/post/create-post`,
          method: 'POST',
          body: data, // 'body' should be used instead of 'data' for the payload in RTK Query
        };
      },
      invalidatesTags: ['PROJECT'],
    }),

    savePost: build.mutation({
      query: ({ saveData }) => {
        // console.log("Saving post data:", saveData); // Log the saveData here
        return {
          url: `/favorite/create-favorite`,
          method: 'POST',
          body: saveData, // 'body' should be used instead of 'data' for the payload in RTK Query
        };
      },
      invalidatesTags: ['PROJECT'],
    }),

    getAllProject: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/project',
        method: 'GET',
        params: arg,
      }),
      providesTags: ['PROJECT'],
    }),

    getSingleProject: build.query({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: 'GET',
      }),
      providesTags: ['PROJECT'],
    }),

    updateProject: build.mutation({
      query: ({ updateData, postId }) => {
        // console.log({ updateData, postId });
        return {
          url: `/post/post/${postId}`, // Use the postId in the URL
          method: 'PATCH',
          body: updateData, // Send the commentObject as the body of the request
        };
      },
      invalidatesTags: ['PROJECT'],
    }),
    deleteProject: build.mutation({
      query: (id) => ({
        url: `/post/post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PROJECT'],
    }),
    getMyProject: build.query({
      query: () => ({
        url: '/post/my-project',
        method: 'GET',
      }),
      providesTags: ['PROJECT'],
    }),
  }),
});

export const { useGetAllProjectQuery, useGetSingleProjectQuery } = postsApi;
