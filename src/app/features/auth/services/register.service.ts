import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private API = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API}`, userData, {
      headers: {},
    });
  }
}
