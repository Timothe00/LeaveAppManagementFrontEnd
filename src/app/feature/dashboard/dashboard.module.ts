import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveCalendarComponent } from './leave-calendar/leave-calendar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { KpiCardComponent } from './kpi-card/kpi-card.component'; // <-- import the module
import * as fr from '@angular/common/locales/fr';
import { LeaveTypeComponent } from './leave-type/leave-type.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    SideNavComponent, 
    EmployeeListComponent, 
    LeaveResquestListComponent, 
    AddUserFormComponent, 
    LeaveRequestFormComponent, 
    UserProfilComponent, 
    ReportingComponent, 
    UserDetailComponent, 
    RequestDetailsComponent, 
    PasswordChangeComponent, 
    LeaveCalendarComponent, KpiCardComponent, LeaveTypeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    FullCalendarModule,
    NgxPaginationModule
  ],  
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class DashboardModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
