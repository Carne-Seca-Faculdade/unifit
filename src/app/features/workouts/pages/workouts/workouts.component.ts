import { Component } from '@angular/core';
import { WorkoutListComponent } from '../../components/workout-list/workout-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { WORKOUTS } from '../../utils/data';
import { Workout } from '../../models/workout';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    WorkoutListComponent,
    ButtonModule,
    RouterLink,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent {
  visible = false;
  newWorkout: Workout = {
    id: uuid(),
    title: '',
    description: '',
    duration: 0,
    exercises: [],
  };
  workouts: Workout[] = [...WORKOUTS];

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.resetNewWorkout();
  }

  saveWorkout() {
    if (this.isValidWorkout(this.newWorkout)) {
      this.workouts = [...this.workouts, { ...this.newWorkout }];
      this.hideDialog();
    } else {
      console.error('Invalid workout data');
    }
  }

  isValidWorkout(workout: Workout): boolean {
    return !!(workout.title && workout.description && workout.duration);
  }

  resetNewWorkout() {
    this.newWorkout = {
      id: uuid(),
      title: '',
      description: '',
      duration: 0,
      exercises: [],
    };
  }
}
