import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Exercise } from '@core/models/exercise';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [ExerciseComponent, RouterLink, CommonModule],
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
}
