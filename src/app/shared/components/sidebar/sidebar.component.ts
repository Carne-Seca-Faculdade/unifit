import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '@app/features/auth/services/login.service';
import { UserModel } from '@core/domain/interfaces';
import { UserService } from '@core/services/user.service';
import { cn } from '@shared/utils/helpers';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() isMobile = false;
  @Input() handleClose = () => {};

  user: UserModel | null = null;
  sidebarWrapperClasses = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.sidebarWrapperClasses = cn(
      'flex-col items-center justify-between h-full gap-8 px-6 py-4 overflow-y-auto bg-white',
      this.isMobile ? 'w-full flex' : 'w-64 hidden sm:flex'
    );

    const userId = this.loginService.getUserId();

    if (!userId) return;

    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  handleLogout() {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }

  handleLinkClick() {
    if (!this.isMobile) return;

    this.handleClose();
  }
}
