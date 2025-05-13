import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, finalize, of } from 'rxjs';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) {
    this.registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  async handleSubmit() {
    if (this.isSubmitting || this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.registerForm.disable();

    this.registerService
      .register(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.registerForm.enable();
        }),
        catchError(() => {
          this.toastService.error('Ocorreu um erro ao criar a conta');
          return of(null);
        })
      )
      .subscribe(() => {
        this.toastService.success(
          'Conta criada com sucesso! Faça login para continuar'
        );
        this.router.navigate(['/auth/login']);
      });
  }
}
