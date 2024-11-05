import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'http://localhost:8080/exercicios';

  constructor(private http: HttpClient) {}

  createExercise(exercise: Omit<ExerciseDTO, 'id'>): Observable<ExerciseDTO> {
    return this.http.post<ExerciseDTO>(`${this.apiUrl}/save`, exercise);
  }

  getExercises(): Observable<ExerciseDTO[]> {
    return this.http.get<ExerciseDTO[]>(this.apiUrl);
  }

  getExerciseById(id: number): Observable<ExerciseDTO> {
    return this.http.get<ExerciseDTO>(`${this.apiUrl}/${id}`);
  }

  updateExercise(exercise: ExerciseDTO): Observable<ExerciseDTO> {
    return this.http.put<ExerciseDTO>(
      `${this.apiUrl}/${exercise.id}`,
      exercise
    );
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
