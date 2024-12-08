import { inject, Injectable } from '@angular/core';
import { UserModel } from '@auth/domain/interfaces';
import { AuthTokenService } from '@auth/services/auth-token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  private readonly authTokenService = inject(AuthTokenService);

  jwtDecode(): UserModel | null {
    const token = this.authTokenService.getToken();

    if (!token) return null;

    return jwtDecode<UserModel>(token);
  }
}
