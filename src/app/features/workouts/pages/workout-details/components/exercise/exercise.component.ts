import { Component, Input } from '@angular/core';
import { Exercise } from '@core/models/exercise';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalService } from '@core/services/global.service';
import { WorkoutsService } from '@core/services/workouts.service';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    InputNumberModule,
    DialogModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  @Input() exercise!: Exercise;

  editExerciseDialogVisible = false;
  deleteExerciseDialogVisible = false;

  selectedExercise: Exercise = {
    id: '',
    name: '',
    description: '',
    sets: 1,
    reps: 1,
    workoutId: '',
  };

  constructor(private workoutsService: WorkoutsService) {}

  showEditExerciseDialog() {
    this.selectedExercise = { ...this.exercise };
    this.editExerciseDialogVisible = true;
  }

  hideEditExerciseDialog() {
    this.editExerciseDialogVisible = false;
  }

  saveExercise() {
    this.workoutsService.updateExercise(this.selectedExercise.workoutId, {
      ...this.selectedExercise,
    });
    this.hideEditExerciseDialog();
  }

  showDeleteExerciseDialog() {
    this.deleteExerciseDialogVisible = true;
  }

  hideDeleteExerciseDialog() {
    this.deleteExerciseDialogVisible = false;
  }

  deleteExercise() {
    this.workoutsService.removeExercise(
      this.exercise.workoutId,
      this.exercise.id
    );
    this.hideDeleteExerciseDialog();
  }
}
