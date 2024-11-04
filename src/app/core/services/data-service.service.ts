import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userDTO } from '@core/models/dto/userDTO';
import { trainingPlansDTO } from '@core/models/dto/trainingPlansDTO';
import { ExerciseLogDTO } from '@core/models/dto/exerciseLogDTO';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<userDTO[]> {
    return this.http.get<userDTO[]>(`${this.apiUrl}/usuarios`);
  }

  getTrainingPlans(): Observable<trainingPlansDTO[]> {
    return this.http.get<trainingPlansDTO[]>(`${this.apiUrl}/planos-treino`);
  }

  getExerciseLogs(userId: number): Observable<ExerciseLogDTO[]> {
    return this.http.get<ExerciseLogDTO[]>(
      `${this.apiUrl}/exercicioLog/user/${userId}`
    );
  }

  getWeeklyExerciseLogs(
    userId: number,
    numberOfWeeks: number = 5
  ): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.apiUrl}/exercicioLog/users/${userId}/weekly?numberOfWeeks=${numberOfWeeks}`
    );
  }

  getExercises(): Observable<ExerciseDTO[]> {
    return this.http.get<ExerciseDTO[]>(`${this.apiUrl}/exercicios`);
  }
}
