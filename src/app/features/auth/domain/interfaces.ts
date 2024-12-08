import { UserRole } from './enums';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = string;

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type UserModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  age: number;
  weight: any;
  height: number;
  trainingPlansIds?: number[];
};
