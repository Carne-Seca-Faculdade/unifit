import { Injectable } from '@angular/core';
import { IMC } from '@core/models/imc';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private userSubject = new BehaviorSubject<User>({
    id: 'c053135f-e915-4477-9161-1c955ece92f0',
    name: 'John',
    lastName: 'Doe',
    height: 1.75,
    email: 'john@example.com',
  });

  private imcSubject = new BehaviorSubject<IMC[]>([]);

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  updateUser(user: User): void {
    this.userSubject.next(user);
  }

  getIMC(): Observable<IMC[]> {
    return this.imcSubject.asObservable();
  }

  addWeight(): void {}
}
