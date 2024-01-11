import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
//import { CoreModule } from 'src/app/core/core.module';
import { SideNavComponent } from 'src/app/core/components/side-nav/side-nav.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeaveResquestListComponent } from './leave-resquest-list/leave-resquest-list.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ReportingComponent } from './reporting/reporting.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    SideNavComponent, 
    EmployeeListComponent, 
    LeaveResquestListComponent, 
    AddUserFormComponent, 
    LeaveRequestFormComponent, 
    UserProfilComponent, ReportingComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
    //CoreModule
  ]
})
export class DashboardModule { }
