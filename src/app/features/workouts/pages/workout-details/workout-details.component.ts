import { Component, OnInit } from '@angular/core';
import { WorkoutListComponent } from '../workouts/components/workout-list/workout-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { WORKOUTS } from '../../utils/data';
import { Workout } from '../../models/workout';
import { Exercise } from '../../models/exercise';
import { v4 as uuid } from 'uuid';
import { sleep } from '@shared/utils/helpers';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';

@Component({
  selector: 'app-workout-details',
  standalone: true,
  imports: [
    WorkoutListComponent,
    ButtonModule,
    RouterLink,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ExerciseListComponent,
  ],
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit {
  workout!: Workout;
  exercises: Exercise[] = [];
  newExercise = { name: '', description: '', sets: 1, reps: 1 };
  exerciseDialogVisible = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadWorkout(id);
      this.loadExercises(id);
    }
  }

  async loadWorkout(id: string): Promise<void> {
    await sleep(1000);
    this.workout = WORKOUTS.find((workout) => workout.id === id) || {
      id,
      name: 'Unknown Workout',
      description: 'No description',
      duration: 0,
      exercises: [],
    };
  }

  async loadExercises(workoutId: string): Promise<void> {
    await sleep(1000);
    this.exercises = [
      {
        id: uuid(),
        name: 'Push Up',
        description: 'A basic exercise',
        sets: 3,
        reps: 10,
      },
      {
        id: uuid(),
        name: 'Squat',
        description: 'Lower body exercise',
        sets: 3,
        reps: 15,
      },
    ].map((exercise) => ({ ...exercise, workoutId }));
  }

  showExerciseDialog(): void {
    this.exerciseDialogVisible = true;
  }

  hideExerciseDialog(): void {
    this.exerciseDialogVisible = false;
    this.resetNewExercise();
  }

  saveExercise(): void {
    if (this.isValidExercise(this.newExercise)) {
      this.exercises.push({
        ...this.newExercise,
        id: uuid(),
      });
      this.hideExerciseDialog();
    }
  }

  isValidExercise(exercise: {
    name: string;
    description: string;
    sets: number;
    reps: number;
  }): boolean {
    return !!(
      exercise.name &&
      exercise.description &&
      exercise.sets &&
      exercise.reps
    );
  }

  resetNewExercise(): void {
    this.newExercise = { name: '', description: '', sets: 1, reps: 1 };
  }
}
