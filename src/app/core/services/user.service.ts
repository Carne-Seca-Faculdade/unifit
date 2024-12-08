import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  criarUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, user);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  calcularIMC(userId: number): Observable<{ IMC: string }> {
    return this.http.get<{ IMC: string }>(
      `${this.apiUrl}/${userId}/calcularIMC`
    );
  }

  addTrainingPlans(
    userId: number,
    trainingPlanIds: number[]
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${userId}/set-plano-treino`,
      trainingPlanIds
    );
  }

  atualizarUser(userId: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }

  deletarUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
