import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TrainingPlansDTO } from '@core/models/dto/trainingPlansDTO';
import { TrainingPlansService } from '@core/services/training-plans.service';
import { TitleComponent } from '@shared/components/title/title.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
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
    TitleComponent,
    RouterModule,
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  visible = false;

  newWorkout: Omit<TrainingPlansDTO, 'id'> = {
    planName: '',
    planDescription: '',
    duration: 0,
    userIds: [],
    exerciseIds: [],
    newExercises: [],
  };
  workouts: TrainingPlansDTO[] = [];
  private trainingPlansSubscription!: Subscription;

  constructor(private trainingPlansService: TrainingPlansService) {}

  ngOnInit(): void {
    this.trainingPlansSubscription = this.trainingPlansService
      .getTrainingPlans()
      .subscribe(plans => {
        this.workouts = plans;
      });
  }

  ngOnDestroy(): void {
    this.trainingPlansSubscription.unsubscribe();
  }

  showDialog(): void {
    this.visible = true;
  }

  hideDialog(): void {
    this.visible = false;
    this.resetNewTrainingPlan();
  }

  saveWorkout(): void {
    if (this.isValidTrainingPlan(this.newWorkout)) {
      this.trainingPlansService.createTrainingPlan(this.newWorkout).subscribe({
        next: createdPlan => {
          this.workouts.push(createdPlan);
          this.hideDialog();
        },
        error: err => {
          console.error('Error creating training plan', err);
        },
      });
    } else {
      console.error('Invalid training plan data');
    }
  }

  isValidTrainingPlan(trainingPlan: Omit<TrainingPlansDTO, 'id'>): boolean {
    return !!(trainingPlan.planName && trainingPlan.duration > 0);
  }

  resetNewTrainingPlan(): void {
    this.newWorkout = {
      planName: '',
      planDescription: '',
      duration: 0,
      userIds: [],
      exerciseIds: [],
      newExercises: [],
    };
  }
}
