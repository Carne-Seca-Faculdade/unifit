import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { createENV } from '@shared/utils/helpers';
import { LoginRequest, LoginResponse } from '../domain/interfaces';
import { UserModel } from '@core/domain/interfaces';
import { UserRole } from '@core/domain/enums';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = createENV('/auth/login');
  private readonly http = inject(HttpClient);
  private readonly authTokenService = inject(AuthTokenService);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.API_URL, data, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((token: LoginResponse) => {
          console.log('token', token);
          this.authTokenService.setToken(token);
          return token;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  jwtDecode(): UserModel | null {
    const token = this.authTokenService.getToken();

    if (!token) return null;

    return jwtDecode<UserModel>(token);
  }

  getUserId(): number | null {
    const user = this.jwtDecode();

    return user?.id ?? null;
  }

  hasPermission(role: UserRole) {
    const user = this.jwtDecode();

    return user?.role === role;
  }
}
