import { Injectable } from '@angular/core';
import { UserDTO } from '@core/models/dto/userDTO';
import { IMC } from '@core/models/imc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private userSubject = new BehaviorSubject<UserDTO>({
    id: 1,
    name: '',
    email: 'joao@email.com',
    age: 0,
    weight: {
      value: 0,
      recordAt: '',
    },
    height: 0,
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
