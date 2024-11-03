import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { sleep } from '@shared/utils/helpers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbRippleModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSubmitting = false;

  constructor(private router: Router) {}

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    await sleep(2000);

    this.isSubmitting = false;

    this.router.navigate(['/app']);
  }
}
