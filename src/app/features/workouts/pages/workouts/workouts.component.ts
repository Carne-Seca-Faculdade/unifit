import { Component } from '@angular/core';
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
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

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
  newWorkout = {
    name: '',
    description: '',
    duration: 0,
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
      this.workouts = [
        ...this.workouts,
        { ...this.newWorkout, id: uuid(), exercises: [] },
      ];
      this.hideDialog();
    } else {
      console.error('Invalid workout data');
    }
  }

  isValidWorkout(workout: {
    name: string;
    description: string;
    duration: number;
  }): boolean {
    return !!(workout.name && workout.description && workout.duration);
  }

  resetNewWorkout() {
    this.newWorkout = {
      name: '',
      description: '',
      duration: 0,
    };
  }
}
