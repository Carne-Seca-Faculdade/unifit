import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from '@core/models/dto/login';
import { UserDTO } from '@core/models/dto/userDTO';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/auth/login';

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {
      responseType: 'text' as 'json',
    });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode(): UserDTO | null {
    let token = this.getToken();
    if (token) {
      return jwtDecode<UserDTO>(token);
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.jwtDecode();
    return user?.id || null;
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as UserDTO;
    if (user.role == role) return true;
    else return false;
  }
}
