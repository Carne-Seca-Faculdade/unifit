import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '@core/models/dto/userDTO';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private API = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.API}`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

