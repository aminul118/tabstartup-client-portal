import { baseApi } from '@/redux/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Register
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/user/register',
        method: 'POST',
        data: userInfo,
      }),
    }),

    // POST - Login
    login: builder.mutation({
      query: (authInfo) => ({
        url: '/auth/login',
        method: 'POST',
        data: authInfo,
      }),
    }),

    // POST - Login
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['USER'],
    }),

    // POST - Send OTP
    sendOtp: builder.mutation({
      query: (otpInfo) => ({
        url: '/otp/send',
        method: 'POST',
        data: otpInfo,
      }),
    }),

    // POST - Verify  OTP
    verifyOtp: builder.mutation({
      query: (otpInfo) => ({
        url: '/otp/verify',
        method: 'POST',
        data: otpInfo,
      }),
    }),

    // POST - Verify  OTP
    userInfo: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
        providesTags: ['USER'],
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = authApi;
