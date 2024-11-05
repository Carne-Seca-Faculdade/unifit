import { Component, Input } from '@angular/core';
import { WorkoutComponent } from '../workout/workout.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingPlansDTO } from '@core/models/dto/trainingPlansDTO';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [WorkoutComponent, RouterLink, CommonModule],
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent {
  @Input() workouts: TrainingPlansDTO[] = [];
}
