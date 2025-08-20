export type { Children } from './react';
export type { TRole, IUser } from './auth.type';

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

