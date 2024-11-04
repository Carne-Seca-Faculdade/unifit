import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sleep } from '@shared/utils/helpers';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  isSubmitting = false;

  constructor(private router: Router) {}

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    await sleep(2000);

    this.isSubmitting = false;

    this.router.navigate(['/auth/login']);
  }
}
