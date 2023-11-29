import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
//import { CoreModule } from 'src/app/core/core.module';
import { SideNavComponent } from 'src/app/core/components/side-nav/side-nav.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeaveResquestListComponent } from './leave-resquest-list/leave-resquest-list.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    SideNavComponent, 
    EmployeeListComponent, LeaveResquestListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    //CoreModule
  ]
})
export class DashboardModule { }
