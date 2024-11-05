import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingPlansDTO } from '@core/models/dto/trainingPlansDTO';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';

@Injectable({
  providedIn: 'root',
})
export class TrainingPlansService {
  private apiUrl = 'http://localhost:8080/planos-treino';

  constructor(private http: HttpClient) {}

  createTrainingPlan(
    trainingPlan: Omit<TrainingPlansDTO, 'id'>
  ): Observable<TrainingPlansDTO> {
    return this.http.post<TrainingPlansDTO>(
      `${this.apiUrl}/save`,
      trainingPlan
    );
  }

  getTrainingPlans(): Observable<TrainingPlansDTO[]> {
    return this.http.get<TrainingPlansDTO[]>(this.apiUrl);
  }

  getTrainingPlanById(id: number): Observable<TrainingPlansDTO> {
    return this.http.get<TrainingPlansDTO>(`${this.apiUrl}/${id}`);
  }

  updateTrainingPlan(
    trainingPlan: TrainingPlansDTO
  ): Observable<TrainingPlansDTO> {
    return this.http.put<TrainingPlansDTO>(
      `${this.apiUrl}/${trainingPlan.id}`,
      trainingPlan
    );
  }

  deleteTrainingPlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createExercise(
    trainingPlanId: number,
    exerciseDTO: ExerciseDTO
  ): Observable<ExerciseDTO> {
    return this.http.post<ExerciseDTO>(
      `${this.apiUrl}/${trainingPlanId}/exercise`,
      exerciseDTO
    );
  }

  getTrainingPlanWithExercisesById(
    trainingPlanId: number
  ): Observable<TrainingPlansDTO> {
    return this.http.get<TrainingPlansDTO>(
      `${this.apiUrl}/${trainingPlanId}/exercise`
    );
  }
}
