import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ExerciseService } from '@core/services/exercise.service';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';

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
  @Input() exercise!: ExerciseDTO;
  @Output() exerciseUpdated = new EventEmitter<ExerciseDTO>();
  @Output() exerciseSaved = new EventEmitter<ExerciseDTO>();
  @Output() exerciseDeleted = new EventEmitter<number>();

  editExerciseDialogVisible = false;
  deleteExerciseDialogVisible = false;

  selectedExercise: ExerciseDTO = {
    id: 0,
    exerciseName: '',
    exerciseDescription: '',
    seriesQuantity: 0,
    repetitionsQuantity: 0,
    trainingPlanId: 0,
  };

  constructor(private exerciseService: ExerciseService) {}

  showEditExerciseDialog() {
    this.selectedExercise = { ...this.exercise };
    this.editExerciseDialogVisible = true;
  }

  hideEditExerciseDialog() {
    this.editExerciseDialogVisible = false;
  }

  saveExercise() {
    this.exerciseService.updateExercise(this.selectedExercise).subscribe({
      next: updatedExercise => {
        console.log('Exercise updated successfully', updatedExercise);
        this.exerciseUpdated.emit(updatedExercise);
        this.hideEditExerciseDialog();
      },
      error: error => {
        console.error('Error updating exercise', error);
      },
    });
  }

  showDeleteExerciseDialog() {
    this.deleteExerciseDialogVisible = true;
  }

  hideDeleteExerciseDialog() {
    this.deleteExerciseDialogVisible = false;
  }

  deleteExercise() {
    this.exerciseService.deleteExercise(this.exercise.id).subscribe({
      next: () => {
        console.log('Exercise deleted successfully');
        this.exerciseDeleted.emit(this.exercise.id);
        this.hideDeleteExerciseDialog();
      },
      error: error => {
        console.error('Error deleting exercise', error);
      },
    });
  }
}
