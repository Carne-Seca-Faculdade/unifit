import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from '../exercise/exercise.component';
import { ExerciseDTO } from '@core/models/dto/exerciseDTO';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [ExerciseComponent, RouterLink, CommonModule],
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent {
  @Input() exercises: ExerciseDTO[] = [];
  @Output() exerciseUpdated = new EventEmitter<ExerciseDTO>();
  @Output() exerciseDeleted = new EventEmitter<number>();

  onExerciseUpdated(updatedExercise: ExerciseDTO) {
    this.exerciseUpdated.emit(updatedExercise);
  }

  onExerciseDeleted(exerciseId: number) {
    this.exerciseDeleted.emit(exerciseId);
  }
}
