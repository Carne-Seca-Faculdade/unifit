import { UserRole } from './enums';

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
