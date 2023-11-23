import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
//import { CoreModule } from 'src/app/core/core.module';
import { SideNavComponent } from 'src/app/core/components/side-nav/side-nav.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    SideNavComponent, 
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    //CoreModule
  ]
})
export class DashboardModule { }
