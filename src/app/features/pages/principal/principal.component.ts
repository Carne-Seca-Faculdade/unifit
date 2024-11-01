import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../../menu/menu.component";
import { AddTrainingComponent } from "../add-training/add-training.component";
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HomeComponent, AddTrainingComponent],
  templateUrl: './principal.component.html',
})
export class PrincipalComponent {

}
