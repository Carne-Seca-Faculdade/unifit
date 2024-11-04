import { Injectable } from '@angular/core';
import { WORKOUTS } from '@shared/utils/data';
import { v4 as uuid } from 'uuid';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { Exercise } from '../models/exercise';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private userSubject = new BehaviorSubject<User>({
    id: 'c053135f-e915-4477-9161-1c955ece92f0',
    name: 'John Doe',
    email: 'john@example.com',
  });

  private workoutsSubject = new BehaviorSubject<Workout[]>([...WORKOUTS]);

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  updateUser(user: User): void {
    this.userSubject.next(user);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  addWorkout(workout: Omit<Workout, 'id' | 'exercises'>): void {
    const newWorkout: Workout = {
      ...workout,
      id: this.generateId(),
      exercises: [],
    };

    const updatedWorkouts = [...this.workoutsSubject.value, newWorkout];
    this.workoutsSubject.next(updatedWorkouts);
  }

  removeWorkout(id: string): void {
    const updatedWorkouts = this.workoutsSubject.value.filter(
      workout => workout.id !== id
    );

    this.workoutsSubject.next(updatedWorkouts);
  }

  deleteWorkout(id: string): void {
    this.removeWorkout(id);
  }

  updateWorkout(updatedWorkout: Workout): void {
    const updatedWorkouts = this.workoutsSubject.value.map(workout =>
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    );
    this.workoutsSubject.next(updatedWorkouts);
  }

  getExercises(workoutId: string): Exercise[] {
    const workout = this.workoutsSubject.value.find(
      workout => workout.id === workoutId
    );
    return workout ? workout.exercises : [];
  }

  addExercise(workoutId: string, exercise: Omit<Exercise, 'id'>): void {
    const newExercise: Exercise = {
      ...exercise,
      id: this.generateId(),
    };
    const workouts = this.workoutsSubject.value.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: [...(workout.exercises || []), newExercise],
        };
      }
      return workout;
    });
    this.workoutsSubject.next(workouts);
  }

  removeExercise(workoutId: string, exerciseId: string): void {
    const workouts = this.workoutsSubject.value.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: (workout.exercises || []).filter(
            exercise => exercise.id !== exerciseId
          ),
        };
      }
      return workout;
    });
    this.workoutsSubject.next(workouts);
  }

  updateExercise(workoutId: string, updatedExercise: Exercise): void {
    const workouts = this.workoutsSubject.value.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: (workout.exercises || []).map(exercise =>
            exercise.id === updatedExercise.id ? updatedExercise : exercise
          ),
        };
      }
      return workout;
    });
    this.workoutsSubject.next(workouts);
  }

  private generateId(): string {
    return uuid();
  }
}
