import { Injectable } from '@angular/core';
import { UserRole } from '@auth/domain/enums';
import { UserModel } from '@auth/domain/interfaces';
import { JWTService } from '@auth/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private currentUser: UserModel | null = null;

  constructor(private jwtService: JWTService) {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.currentUser = this.jwtService.jwtDecode();
  }

  getCurrentUser(): UserModel {
    return this.currentUser!;
  }

  setCurrentUser(user: UserModel) {
    this.currentUser = user;
  }

  getCurrentUserId(): number | null {
    const id = this.currentUser?.id;
    return id ? Number(id) : null;
  }

  getCurrentUserRole(): string {
    return this.currentUser?.role || UserRole.USER;
  }
}
