import { Component, Input } from '@angular/core';
import { Exercise } from '../../../../models/exercise';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  @Input() exercise!: Exercise;
}
