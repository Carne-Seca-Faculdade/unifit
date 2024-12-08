import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseModel } from '../domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'http://localhost:8080/exercicios';

  constructor(private http: HttpClient) {}

  createExercise(
    exercise: Omit<ExerciseModel, 'id'>
  ): Observable<ExerciseModel> {
    return this.http.post<ExerciseModel>(`${this.apiUrl}/save`, exercise);
  }

  getExercises(): Observable<ExerciseModel[]> {
    return this.http.get<ExerciseModel[]>(this.apiUrl);
  }

  getExerciseById(id: number): Observable<ExerciseModel> {
    return this.http.get<ExerciseModel>(`${this.apiUrl}/${id}`);
  }

  updateExercise(exercise: ExerciseModel): Observable<ExerciseModel> {
    return this.http.put<ExerciseModel>(
      `${this.apiUrl}/${exercise.id}`,
      exercise
    );
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
