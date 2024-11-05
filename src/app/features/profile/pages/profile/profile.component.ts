import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { GlobalService } from './../../../../core/services/global.service';

import { CommonModule } from '@angular/common';
import { IMC } from '@core/models/imc';
import { User } from '@core/models/user';
import { TitleComponent } from '../../../../shared/components/title/title.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TitleComponent,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', name: '', lastName: '', height: 0, email: '' };
  editUser: User = { id: '', name: '', lastName: '', height: 0, email: '' };

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.getUser().subscribe(user => {
      this.user = user;
      this.editUser = { ...user };
    });
  }

  saveUser(): void {
    console.log(this.editUser);
    this.globalService.updateUser(this.editUser);
  }

  resetUser(): void {
    this.editUser = { ...this.user };
  }

  products: IMC[] = [];

  saveIMC(): void {
    console.log(this.products);
    this.globalService.addWeight();
  }

  onRowEditInit(product: any): void {
    // Add your logic here

    console.log('Row edit initialized', product);
  }

  onRowEditSave(product: any): void {
    // Add your logic here

    console.log('Row edit saved', product);
  }

  onRowEditCancel(product: any, index: number): void {
    // Add your logic here

    console.log('Row edit cancelled', product, index);
  }
}
