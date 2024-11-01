import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MdbFormsModule, ReactiveFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  router = inject(Router);

  email: string = '';
  password: string = '';

  logar() {
    if (this.email == 'admin' && this.password == 'admin') {
      this.router.navigate(['admin/home']);
    } else {
      alert('E-mail ou senha inválidos');
    }
  }
}
