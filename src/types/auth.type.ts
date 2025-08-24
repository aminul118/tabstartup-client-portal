export type TRole = 'entrepreneur' | 'investor' | 'super_admin';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isDeleted: boolean;
  isActive: 'ACTIVE' | 'INACTIVE';
  isVerified: boolean;
  photo?: string;
  auths: string[];
  createdAt: string;
  updatedAt: string;
}
