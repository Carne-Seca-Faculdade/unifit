export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

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
  role: string;
  age: number;
  weight: any;
  height: number;
  trainingPlansIds?: number[];
  userIdentifier: string;
};
