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
