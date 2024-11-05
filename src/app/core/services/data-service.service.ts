import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '@core/models/dto/userDTO';
import { ExerciseLogDTO } from '@core/models/dto/exerciseLogDTO';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';
import { TrainingPlansDTO } from '@core/models/dto/trainingPlansDTO';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getWeeklyExerciseLogs(
    userId: number,
    numberOfWeeks: number = 5
  ): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.apiUrl}/exercicioLog/users/${userId}/weekly?numberOfWeeks=${numberOfWeeks}`
    );
  }
}
