import { SharedModule } from './../../shared/shared.module';
import { SidDashboardComponent } from './sid-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { dashboardRoutingModule } from './siddashboard-routing.module';

@NgModule({
  declarations: [
    SidDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    dashboardRoutingModule
  ]
})
export class SidDashboardModule { }
