import { Injectable } from '@angular/core';
import { localStorageService } from '@core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  setToken(token: string): void {
    localStorageService.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorageService.getItem<string>('authToken');
  }

  removeToken(): void {
    localStorageService.deleteItem('authToken');
  }
}
