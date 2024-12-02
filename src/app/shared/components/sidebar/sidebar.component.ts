import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '@app/features/auth/services/login.service';
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

  user = { name: '', email: '' };

  sidebarWrapperClasses = '';

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUserId();

    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
      });

      this.sidebarWrapperClasses = cn(
        'flex-col items-center justify-between h-full gap-8 px-8 py-4 overflow-y-auto bg-white',
        this.isMobile ? 'w-full flex' : 'w-80 hidden sm:flex'
      );
    }
  }
}
