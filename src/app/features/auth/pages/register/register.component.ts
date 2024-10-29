import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, MdbFormsModule, ReactiveFormsModule, MdbRippleModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {}
