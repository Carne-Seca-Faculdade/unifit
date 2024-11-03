import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { sleep } from '@shared/utils/helpers';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, MdbFormsModule, ReactiveFormsModule, MdbRippleModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  isSubmitting = false;

  constructor() {}

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    await sleep(2000);

    this.isSubmitting = false;
  }
}
