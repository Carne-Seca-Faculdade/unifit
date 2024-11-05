import { Injectable } from '@angular/core';
import { IMC } from '@core/models/imc';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserDTO } from '@core/models/dto/userDTO';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
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

  private imcSubject = new BehaviorSubject<IMC[]>([]);

  updateUser(userDTO: UserDTO): void {
    this.userSubject.next(userDTO);
  }

  getIMC(): Observable<IMC[]> {
    return this.imcSubject.asObservable();
  }

  addWeight(): void {}
}
