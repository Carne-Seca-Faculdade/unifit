import { Component, OnInit } from '@angular/core';
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
export class WorkoutDetailsComponent implements OnInit {
  workout!: Workout;
  newExercise: Omit<Exercise, 'id'> = { name: '', description: '', sets: 1, reps: 1 };
  exerciseDialogVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/workouts']);
      return
    }

    this.loadWorkout(id);
  }

  loadWorkout(id: string): void {
    const workout = this.globalService.getWorkouts().find(workout => workout.id === id)

    if (!workout) {
      this.router.navigate(['/workouts']);
      return
    }

    this.workout = workout;
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
