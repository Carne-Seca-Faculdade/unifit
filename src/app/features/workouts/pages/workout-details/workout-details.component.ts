import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkoutListComponent } from '../workouts/components/workout-list/workout-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TitleComponent } from '@shared/components/title/title.component';
import { TooltipModule } from 'primeng/tooltip';
import { TrainingPlansDTO } from '@core/models/dto/trainingPlansDTO';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';
import { TrainingPlansService } from '@core/services/training-plans.service';

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
    TitleComponent,
    TooltipModule,
  ],
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {
  workout: TrainingPlansDTO = {
    id: 0,
    planName: '',
    planDescription: '',
    duration: 0,
    exerciseIds: [],
    newExercises: [],
  };

  newExercise: Omit<ExerciseDTO, 'id'> = {
    exerciseName: '',
    exerciseDescription: '',
    seriesQuantity: 1,
    repetitionsQuantity: 1,
    trainingPlanId: 1,
  };

  exercises: ExerciseDTO[] = [];

  editWorkout: TrainingPlansDTO = {
    id: 0,
    planName: '',
    planDescription: '',
    duration: 0,
    exerciseIds: [],
    newExercises: [],
  };

  isExerciseDialogVisible = false;
  isEditWorkoutDialogVisible = false;
  isDeleteWorkoutVisible = false;
  isWorkoutTimerVisible = false;

  private workoutSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutsService: TrainingPlansService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/workouts']);
      return;
    }

    this.workoutSubscription = this.workoutsService
      .getTrainingPlanWithExercisesById(+id)
      .subscribe(
        workout => {
          this.workout = workout;
          this.exercises = workout.newExercises || [];
          this.resetEditWorkout();
        },
        error => {
          console.error('Erro ao carregar o plano de treino:', error);
          this.router.navigate(['/app/workouts']);
        }
      );
  }

  ngOnDestroy(): void {
    this.workoutSubscription.unsubscribe();
  }

  showExerciseDialog(): void {
    this.isExerciseDialogVisible = true;
  }

  hideExerciseDialog(): void {
    this.isExerciseDialogVisible = false;
    this.resetNewExercise();
  }

  saveExercise(): void {
    if (!this.isValidExercise(this.newExercise)) return;

    this.workoutsService
      .createExercise(this.workout.id, {
        ...this.newExercise,
        id: this.workout.id,
      })
      .subscribe({
        next: (newExercise: ExerciseDTO) => {
          this.exercises.push(newExercise);
          this.hideExerciseDialog();
          this.resetNewExercise();
        },
        error: error => {
          console.error('Error adding exercise:', error);
        },
      });
  }

  isValidExercise(exercise: Omit<ExerciseDTO, 'id'>): boolean {
    return !!(
      exercise.exerciseName &&
      exercise.exerciseDescription &&
      exercise.seriesQuantity &&
      exercise.repetitionsQuantity
    );
  }

  resetNewExercise(): void {
    this.newExercise = {
      exerciseName: '',
      exerciseDescription: '',
      seriesQuantity: 1,
      repetitionsQuantity: 1,
      trainingPlanId: this.workout.id,
    };
  }

  resetEditWorkout(): void {
    this.editWorkout = {
      id: this.workout.id,
      planName: this.workout.planName,
      planDescription: this.workout.planDescription,
      duration: this.workout.duration,
      exerciseIds: this.workout.exerciseIds,
    };
  }

  showEditDialog(): void {
    this.isEditWorkoutDialogVisible = true;
  }

  hideEditDialog(): void {
    this.isEditWorkoutDialogVisible = false;
    this.resetEditWorkout();
  }

  saveWorkout(): void {
    const workout = this.editWorkout;

    if (!this.isValidWorkout(workout)) {
      console.warn('Invalid workout data:', workout);
      return;
    }

    this.workoutsService.updateTrainingPlan(workout).subscribe({
      next: (updatedWorkout: TrainingPlansDTO) => {
        console.log('Workout updated successfully:', updatedWorkout);
        this.workout = updatedWorkout;
        this.hideEditDialog();
      },
      error: error => {
        console.error('Error updating workout:', error);
      },
    });
  }

  isValidWorkout(workout: TrainingPlansDTO | null): boolean {
    if (!workout) return false;
    return !!(
      workout.planName &&
      workout.planDescription &&
      workout.duration > 0
    );
  }

  deleteWorkout(): void {
    this.hideDeleteDialog();
    this.workoutsService.deleteTrainingPlan(this.workout.id).subscribe({
      next: () => {
        this.router.navigate(['/app/workouts']);
      },
      error: error => {
        console.error('Error deleting workout:', error);
      },
    });
  }

  hideDeleteDialog(): void {
    this.isDeleteWorkoutVisible = false;
  }

  showDeleteDialog(): void {
    this.isDeleteWorkoutVisible = true;
  }

  onExerciseUpdated(updatedExercise: ExerciseDTO) {
    const index = this.exercises.findIndex(
      exercise => exercise.id === updatedExercise.id
    );
    if (index !== -1) {
      this.exercises[index] = updatedExercise;
    }
  }

  onExerciseDeleted(exerciseId: number) {
    this.exercises = this.exercises.filter(
      exercise => exercise.id !== exerciseId
    );
  }
}
