import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '@core/services/global.service';
import { cn } from '@shared/utils/helpers';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() isMobile = false;

  user = { name: '', email: '' };

  sidebarWrapperClasses = ""

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.getUser().subscribe(user => {
      this.user = user;
    });

    this.sidebarWrapperClasses = cn(
"flex-col items-center justify-between h-full gap-8 px-8 py-4 overflow-y-auto bg-white",
this.isMobile ? 'w-full flex' : "w-80 hidden sm:flex"
  )
  }
}
