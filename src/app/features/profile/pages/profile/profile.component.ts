import { Component } from '@angular/core';
import { TitleComponent } from "../../../../shared/components/title/title.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
