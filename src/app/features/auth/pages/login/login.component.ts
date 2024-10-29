import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MdbFormsModule, ReactiveFormsModule, MdbRippleModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSubmitting = false;

  constructor(private readonly authService: AuthService) {}

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const response = await this.authService.login({
        email,
        password,
      });

      console.log('response - ', response);
    } catch (error) {
      console.log('error - ', error);
    }

    this.isSubmitting = false;
  }
}
