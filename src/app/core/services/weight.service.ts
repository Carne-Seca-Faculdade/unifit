import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { weightLogDTO } from '@core/models/dto/weightLogDTO';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getWeightHistory(userId: number): Observable<weightLogDTO[]> {
    return this.http.get<weightLogDTO[]>(
      `${this.apiUrl}/weight-history/user/${userId}`
    );
  }
}
