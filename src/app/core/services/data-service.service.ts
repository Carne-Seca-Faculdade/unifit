import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getWeeklyExerciseLogs(
    userId: number,
    numberOfWeeks: number = 5
  ): Record<string, number> {
    return {
      "2024-11-11 to 2024-11-18": 0,
      "2024-11-04 to 2024-11-11": 0,
      "2024-10-28 to 2024-11-04": 2,
      "2024-10-21 to 2024-10-28": 6,
      "2024-10-14 to 2024-10-21": 8
  }
  }
}
