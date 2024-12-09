import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightLogModel } from '@workouts/domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getWeightHistory(userId: number): Observable<WeightLogModel[]> {
    return this.http.get<WeightLogModel[]>(
      `${this.apiUrl}/weight-history/user/${userId}`
    );
  }
}
