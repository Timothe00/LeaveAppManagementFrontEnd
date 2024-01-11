import { UserProfilComponent } from './user-profil/user-profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeaveResquestListComponent } from './leave-resquest-list/leave-resquest-list.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
      [
        { path: 'userProfile', component: UserProfilComponent },
        { path: 'reporting', component: ReportingComponent },
        { path: 'EmployeeList', component: EmployeeListComponent },
        { path: 'EmployeeList/add', component: AddUserFormComponent },
        { path: 'EmployeeList/edit/:id', component: AddUserFormComponent },
        { path: 'LeaveResquestList', component: LeaveResquestListComponent },
        { path: 'leave-request-form/add', component: LeaveRequestFormComponent },
        { path: 'leave-request-form/edit/:id', component: LeaveRequestFormComponent }, 
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
