import { Component, Input } from '@angular/core';
import { Workout } from '../../../../models/workout';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workout.component.html',
})
export class WorkoutComponent {
  @Input() workout!: Workout;
}
