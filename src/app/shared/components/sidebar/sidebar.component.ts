import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '@core/services/global.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  user = { name: '', email: '' };

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
