import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createENV } from '@shared/utils/helpers';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../domain/interfaces';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = createENV('/auth/login');
  private readonly http = inject(HttpClient);
  private readonly authTokenService = inject(AuthTokenService);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL, data).pipe(
      map((response: LoginResponse) => {
        this.authTokenService.setToken(response.access_token);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  logout() {
    this.authTokenService.removeToken();
  }
}
