import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule, ChartModule],
})
export class DashboardModule {}
