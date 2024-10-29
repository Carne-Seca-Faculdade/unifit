import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 2000);
    });
  }
}
