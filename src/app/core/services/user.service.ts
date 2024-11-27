import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '@core/models/dto/userDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  criarUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/save`, user);
  }

  getUser(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${userId}`);
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

  atualizarUser(userId: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/${userId}`, user);
  }

  deletarUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
