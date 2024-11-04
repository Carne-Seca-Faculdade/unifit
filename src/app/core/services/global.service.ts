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

  private workouts: Workout[] = [...WORKOUTS];

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  updateUser(user: User): void {
    this.userSubject.next(user);
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  addWorkout(workout: Omit<Workout, 'id' | 'exercises'>): void {
    const newWorkout: Workout = {
      ...workout,
      id: this.generateId(),
      exercises: [],
    };

    this.workouts = [...this.workouts, newWorkout];
  }

  removeWorkout(id: string): void {
    this.workouts = this.workouts.filter((workout) => workout.id !== id);
  }

  updateWorkout(updatedWorkout: Workout): void {
    this.workouts = this.workouts.map((workout) =>
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    );
  }

  getExercises(workoutId: string): Exercise[] {
    const workout = this.workouts.find((workout) => workout.id === workoutId);
    return workout ? workout.exercises : [];
  }

  addExercise(workoutId: string, exercise: Omit<Exercise, 'id'>): void {
    const newExercise: Exercise = {
      ...exercise,
      id: this.generateId(),
    };
    const workout = this.workouts.find((workout) => workout.id === workoutId);

    if (!workout) return;

    workout.exercises = [...(workout.exercises || []), newExercise];
  }

  removeExercise(workoutId: string, exerciseId: string): void {
    const workout = this.workouts.find((workout) => workout.id === workoutId);

    if (!workout) return;

    workout.exercises = (workout.exercises || []).filter(
      (exercise) => exercise.id !== exerciseId
    );
  }

  updateExercise(workoutId: string, updatedExercise: Exercise): void {
    const workout = this.workouts.find((workout) => workout.id === workoutId);

    if (!workout) return;

    workout.exercises = (workout.exercises || []).map((exercise) =>
      exercise.id === updatedExercise.id ? updatedExercise : exercise
    );
  }

  private generateId(): string {
    return uuid();
  }
}
