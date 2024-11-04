import { Component, Input } from '@angular/core';
import { Workout } from '../../models/workout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout.component.html',
})
export class WorkoutComponent {
  @Input() workout!: Workout;
}
