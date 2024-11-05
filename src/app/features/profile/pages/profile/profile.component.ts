import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IMC } from '@core/models/imc';
import { UserDTO } from '@core/models/dto/userDTO';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { MessageService } from 'primeng/api';
import { UserService } from '@core/services/user.service';
import { GlobalService } from '@core/services/global.service';

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
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user: UserDTO = {
    id: 0,
    name: '',
    email: '',
    age: 0,
    weight: {
      value: 0,
      recordAt: '',
    },
    height: 0,
  };
  editUser: UserDTO = {
    id: 0,
    name: '',
    email: '',
    age: 0,
    weight: {
      value: 0,
      recordAt: '',
    },
    height: 0,
  };

  constructor(
    private userService: UserService,
    private globalService: GlobalService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.editUser = { ...user };
    });
  }

  saveUser(): void {
    this.userService.atualizarUser(this.editUser.id, this.editUser).subscribe(
      (updatedUser: UserDTO) => {
        this.editUser = { ...updatedUser };
        this.attUser();
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado com sucesso!',
        });
      },
      error => {
        console.error('Erro ao atualizar usuário', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar usuário.',
        });
      }
    );
  }

  attUser(): void {
    console.log(this.editUser);
    console.log("cal")
    this.globalService.updateUser(this.editUser);
  }

  handleClick():void {
    this.saveUser()
    this.attUser()
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
    console.log('Row edit initialized', product);
  }

  onRowEditSave(product: any): void {
    console.log('Row edit saved', product);
  }

  onRowEditCancel(product: any, index: number): void {
    console.log('Row edit cancelled', product, index);
  }
}
