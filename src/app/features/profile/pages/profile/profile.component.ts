import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { TitleComponent } from '@shared/components/title/title.component';
import { ToastModule } from 'primeng/toast';
import { GlobalStateService } from '@core/services/global-state.service';
import { UserService } from '@profile/services/user.service';
import { UserModel } from '@auth/domain/interfaces';
import { UserRole } from '@auth/domain/enums';
import { ToastrService } from 'ngx-toastr';

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
    ToastModule,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: UserModel = this.getInitialUser();
  editUser: UserModel = this.getInitialUser();

  isEditDialogVisible = false;

  constructor(
    private userService: UserService,
    private globalStateService: GlobalStateService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    const user = this.globalStateService.getCurrentUser();
    this.user = {
      ...user,
      weight: user.weight ? { ...user.weight } : { value: 0, recordAt: '' },
    };
    this.resetEditUser();
  }

  private getInitialUser(): UserModel {
    return {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: UserRole.USER,
      age: 0,
      weight: {
        value: 0,
        recordAt: '',
      },
      height: 0,
    };
  }

  resetEditUser() {
    this.editUser = {
      ...this.user,
      weight: this.user.weight
        ? { ...this.user.weight }
        : { value: 0, recordAt: '' },
    };
  }

  showEditDialog() {
    this.isEditDialogVisible = true;
  }

  hideEditDialog() {
    this.isEditDialogVisible = false;
    this.resetEditUser();
  }

  handleSaveUser() {
    if (!this.editUser) return;

    this.userService.updateUser(this.editUser.id, this.editUser).subscribe({
      next: (updatedUser: UserModel) => {
        this.user = {
          ...updatedUser,
          weight: updatedUser.weight
            ? { ...updatedUser.weight }
            : { value: 0, recordAt: '' },
        };
        this.resetEditUser();
        this.globalStateService.setCurrentUser(updatedUser);
        this.toastService.success('Usuário atualizado com sucesso');
        this.hideEditDialog();
      },
      error: () => {
        this.toastService.error('Ocorreu um erro ao atualizar o usuário');
      },
    });
  }
}
