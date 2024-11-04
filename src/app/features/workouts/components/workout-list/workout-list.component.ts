import { Component, Input } from '@angular/core';
import { WorkoutComponent } from '../workout/workout.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [WorkoutComponent, RouterLink, CommonModule],
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent {
  @Input() workouts: Workout[] = [];
}
