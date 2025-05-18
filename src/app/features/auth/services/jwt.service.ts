import { inject, Injectable } from '@angular/core';
import { UserModel } from '@auth/domain/interfaces';
import { AuthTokenService } from '@auth/services/auth-token.service';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '@auth/domain/enums';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  private readonly authTokenService = inject(AuthTokenService);

  jwtDecode(): UserModel | null {
    const token = this.authTokenService.getToken();

    if (!token) return null;

    try {
<<<<<<< Updated upstream
      const decode: any = jwtDecode(token);
=======
      const decode = jwtDecode<JWTPayload>(token);

      const jwtRoles = decode.realm_access?.roles ?? [];
      const roles = jwtRoles.filter((role): role is UserRole =>
        Object.values(UserRole).includes(role as UserRole)
      );

>>>>>>> Stashed changes
      return {
        id: 0,
        name: decode.preferred_username,
        age: 0,
        weight: null,
        height: 0,
        email: decode.email,
        roles,
        userIdentifier: decode.sub,
        trainingPlansIds: [],
      };
    } catch (error) {
      console.error('Erro em decodificar o token', error);
      return null;
    }
  }
}
