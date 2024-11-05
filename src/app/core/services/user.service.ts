import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '@core/models/dto/userDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserDTO>({
    id: 1,
    name: 'Xirumbinha',
    email: 'xirumbinha@gmail.com',
    age: 33,
    weight: {
      value: 77.8,
      recordAt: '',
    },
    height: 1.75,
  });

  getUser(): Observable<UserDTO> {
    return this.userSubject.asObservable();
  }

  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  criarUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/save`, user);
  }

  listarUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
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
