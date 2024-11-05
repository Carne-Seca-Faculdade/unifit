import { Injectable } from '@angular/core';
import { Workout } from '@core/models/workout';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { WORKOUTS } from '@shared/utils/data';
import { v4 as uuid } from 'uuid';
import { Exercise } from '@core/models/exercise';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);

  constructor(private localStorageService: LocalStorageService) {
    this.loadWorkouts();
  }

  private loadWorkouts(): void {
    const workouts = this.localStorageService.getItem<Workout[]>('workouts');

    if (!workouts) {
      const defaultWorkouts: Workout[] = [...WORKOUTS];

      this.workoutsSubject.next(defaultWorkouts);
      this.updateLocalStorage(defaultWorkouts);
      return;
    }

    this.workoutsSubject.next(workouts);
  }

  private updateLocalStorage(workouts: Workout[]): void {
    this.localStorageService.setItem('workouts', workouts);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  addWorkout(workout: Omit<Workout, 'id' | 'exercises'>): void {
    const newWorkout: Workout = {
      ...workout,
      id: uuid(),
      exercises: [],
    };

    const updatedWorkouts = [...this.workoutsSubject.value, newWorkout];
    this.workoutsSubject.next(updatedWorkouts);
    this.updateLocalStorage(updatedWorkouts);
  }

  removeWorkout(id: string): void {
    const updatedWorkouts = this.workoutsSubject.value.filter(
      workout => workout.id !== id
    );

    this.workoutsSubject.next(updatedWorkouts);
    this.updateLocalStorage(updatedWorkouts);
  }

  updateWorkout(updatedWorkout: Workout): void {
    const updatedWorkouts = this.workoutsSubject.value.map(workout =>
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    );

    this.workoutsSubject.next(updatedWorkouts);
    this.updateLocalStorage(updatedWorkouts);
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
      id: uuid(),
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
    this.updateLocalStorage(workouts);
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
    this.updateLocalStorage(workouts);
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
    this.updateLocalStorage(workouts);
  }
}
