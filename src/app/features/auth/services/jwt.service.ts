import { inject, Injectable } from '@angular/core';
import { UserModel } from '@auth/domain/interfaces';
import { AuthTokenService } from '@auth/services/auth-token.service';
import { jwtDecode } from 'jwt-decode';

type JWTPayload = {
  preferred_username: string;
  email: string;
  sub: string;
  realm_access?: {
    roles?: string[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  private readonly authTokenService = inject(AuthTokenService);

  jwtDecode(): UserModel | null {
    const token = this.authTokenService.getToken();

    if (!token) return null;

    try {
      const decode = jwtDecode<JWTPayload>(token);
      return {
        id: 1,
        name: decode.preferred_username,
        age: 0,
        weight: null,
        height: 0,
        email: decode.email,
        role: decode.realm_access?.roles?.includes('ADMIN') ? 'ADMIN' : 'USER',
        userIdentifier: decode.sub,
      };
    } catch (error) {
      console.error('Erro em decodificar o token', error);
    }
    return null;
  }
}
