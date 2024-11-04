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
    ExerciseListComponent
  ],
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {
  workout!: Workout;
  newExercise: Omit<Exercise, 'id'> = { name: '', description: '', sets: 1, reps: 1 };
  exerciseDialogVisible = false;
  private workoutSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/workouts']);
      return;
    }

    this.workoutSubscription = this.globalService.getWorkouts().subscribe(workouts => {
      const workout = workouts.find(w => w.id === id);
      if (workout) {
        this.workout = workout;
      } else {
        this.router.navigate(['/workouts']);
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
    if (this.isValidExercise(this.newExercise)) {
      this.globalService.addExercise(this.workout.id, this.newExercise);
      this.hideExerciseDialog();
    }
  }

  isValidExercise(exercise: Omit<Exercise, 'id'>): boolean {
    return !!(exercise.name && exercise.description && exercise.sets && exercise.reps);
  }

  resetNewExercise(): void {
    this.newExercise = { name: '', description: '', sets: 1, reps: 1 };
  }
}
