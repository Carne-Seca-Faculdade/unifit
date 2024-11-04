import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkoutListComponent } from '../workouts/components/workout-list/workout-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../../core/models/workout';
import { Exercise } from '../../../../core/models/exercise';
import { GlobalService } from '../../../../core/services/global.service';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ConfirmDialogModule,
  ],
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {
  workout!: Workout;
  newExercise: Omit<Exercise, 'id'> = {
    name: '',
    description: '',
    sets: 1,
    reps: 1,
  };
  editWorkout: Workout = {
    id: '',
    name: '',
    description: '',
    duration: 0,
    exercises: [],
  };
  exerciseDialogVisible = false;
  editDialogVisible = false;
  deleteDialogVisible = false;
  confirmDialogVisible = false;
  private workoutSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/workouts']);
      return;
    }

    this.workoutSubscription = this.globalService
      .getWorkouts()
      .subscribe((workouts) => {
        const workout = workouts.find((w) => w.id === id);
        if (workout) {
          this.workout = workout;
          this.editWorkout = { ...workout };
        } else {
          this.router.navigate(['/app/workouts']);
        }
      });
  }

  ngOnDestroy(): void {
    this.workoutSubscription.unsubscribe();
  }

  showExerciseDialog(): void {
    this.exerciseDialogVisible = true;
  }

  hideExerciseDialog(): void {
    this.exerciseDialogVisible = false;
    this.resetNewExercise();
  }

  saveExercise(): void {
    if (!this.isValidExercise(this.newExercise)) return;

    this.globalService.addExercise(this.workout.id, this.newExercise);
    this.hideExerciseDialog();
  }

  isValidExercise(exercise: Omit<Exercise, 'id'>): boolean {
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

  resetEditWorkout(): void {
    this.editWorkout = {
      id: this.workout.id,
      name: this.workout.name,
      description: this.workout.description,
      duration: this.workout.duration,
      exercises: this.workout.exercises,
    };
  }

  showEditDialog(): void {
    this.editDialogVisible = true;
  }

  hideEditDialog(): void {
    this.editDialogVisible = false;
    this.resetEditWorkout();
  }

  saveWorkout(): void {
    const workout = this.editWorkout;

    if (!this.isValidWorkout(workout)) return;

    this.globalService.updateWorkout(workout!);
    this.hideEditDialog();
  }

  isValidWorkout(workout: Workout | null): boolean {
    if (!workout) return false;

    return !!(workout.name && workout.description && workout.duration > 0);
  }

  deleteWorkout(): void {
    this.hideDeleteDialog();
    this.globalService.deleteWorkout(this.workout.id);
    this.router.navigate(['/app/workouts']);
  }

  hideDeleteDialog(): void {
    this.deleteDialogVisible= false;
  }

  showDeleteDialog(): void {
    this.deleteDialogVisible = true;
  }
}
