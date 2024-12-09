import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TitleComponent } from '@shared/components/title/title.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import {
  AddTrainingPlanModel,
  TrainingPlanModel,
} from '../../domain/interfaces';
import { TrainingPlansService } from '../../services/training-plans.service';
import { ToastrService } from 'ngx-toastr';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';

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
    SubtitleComponent,
    RouterModule,
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  visible = false;
  workouts: TrainingPlanModel[] = [];
  newWorkoutForm: AddTrainingPlanModel = this.initializeWorkoutForm();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private trainingPlansService: TrainingPlansService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.loadTrainingPlans();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadTrainingPlans() {
    const subscriptions = this.trainingPlansService
      .getTrainingPlans()
      .subscribe({
        next: plans => {
          this.workouts = plans;
        },
        error: () => {
          this.toastService.error('Erro ao carregar planos de treino');
        },
      });

    this.subscriptions.add(subscriptions);
  }

  private initializeWorkoutForm(): AddTrainingPlanModel {
    return {
      planName: '',
      planDescription: '',
      duration: 0,
      userIds: [],
      exerciseIds: [],
      newExercises: [],
    };
  }

  showCreateWorkoutDialog() {
    this.visible = true;
  }

  hideCreateWorkoutDialog() {
    this.visible = false;
    this.newWorkoutForm = this.initializeWorkoutForm();
  }

  saveWorkout() {
    const isFormValid = this.isValidTrainingPlan(this.newWorkoutForm);

    if (!isFormValid) {
      this.toastService.error('Preencha os campos obrigatórios');
      return;
    }

    const createWorkoutSubscription = this.trainingPlansService
      .createTrainingPlan(this.newWorkoutForm)
      .subscribe({
        next: createdPlan => {
          this.workouts.push(createdPlan);
          this.hideCreateWorkoutDialog();
          this.toastService.success('Plano de treino criado com sucesso');
        },
        error: () => {
          this.toastService.error('Erro ao criar plano de treino');
        },
      });

    this.subscriptions.add(createWorkoutSubscription);
  }

  isValidTrainingPlan(trainingPlan: AddTrainingPlanModel): boolean {
    return !!(trainingPlan.planName && trainingPlan.duration > 0);
  }
}
