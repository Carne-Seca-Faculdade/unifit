import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Workout } from '@core/models/workout';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { WorkoutsService } from '@core/services/workouts.service';

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
    TitleComponent,
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  visible = false;
  newWorkout: Omit<Workout, 'id' | 'exercises'> = {
    name: '',
    description: '',
    duration: 0,
  };
  workouts: Workout[] = [];
  private workoutsSubscription!: Subscription;

  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit(): void {
    this.workoutsSubscription = this.workoutsService
      .getWorkouts()
      .subscribe(workouts => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy(): void {
    this.workoutsSubscription.unsubscribe();
  }

  showDialog(): void {
    this.visible = true;
  }

  hideDialog(): void {
    this.visible = false;
    this.resetNewWorkout();
  }

  saveWorkout(): void {
    if (this.isValidWorkout(this.newWorkout)) {
      this.workoutsService.addWorkout(this.newWorkout);
      this.hideDialog();
    } else {
      console.error('Invalid workout data');
    }
  }

  isValidWorkout(workout: Omit<Workout, 'id' | 'exercises'>): boolean {
    return !!(workout.name && workout.description && workout.duration > 0);
  }

  resetNewWorkout(): void {
    this.newWorkout = {
      name: '',
      description: '',
      duration: 0,
    };
  }
}
