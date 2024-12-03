import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '@app/features/auth/services/login.service';
import { UserDTO } from '@core/models/dto/userDTO';
import { UserService } from '@core/services/user.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
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
    DialogModule,
  ],
  templateUrl: './profile.component.html',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  visible = false;

  user: UserDTO = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
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
    password: '',
    role: '',
    age: 0,
    weight: {
      value: 0,
      recordAt: '',
    },
    height: 0,
  };

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUserId();

    if (userId) {
      this.userService.getUser(userId).subscribe(
        (user: UserDTO) => {
          this.user = user;
          this.editUser = {
            ...user,
            weight: user.weight || { value: 0, recordAt: '' },
          };
        },
        error => {
          console.error('Erro ao carregar usuario', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao carregar dados do usuario.',
          });
        }
      );
    } else {
      console.error('Usuario nao autenticado ou token invalido.');
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuario nao autenticado.',
      });
    }
  }

  saveUser(): void {
    this.userService.atualizarUser(this.editUser.id, this.editUser).subscribe(
      (updatedUser: UserDTO) => {
        this.editUser = { ...updatedUser };
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuario atualizado com sucesso!',
        });
      },
      error => {
        console.error('Erro ao atualizar usuario', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar usuario.',
        });
      }
    );
  }

  handleclick(): void {
    this.userService.atualizarUser(this.editUser.id, this.editUser);
    this.saveUser();
  }

  resetUser(): void {
    this.editUser = { ...this.user };
  }

  showDialog(): void {
    this.visible = true;
  }
}
