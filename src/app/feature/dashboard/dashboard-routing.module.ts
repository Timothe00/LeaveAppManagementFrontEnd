import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeaveResquestListComponent } from './leave-resquest-list/leave-resquest-list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
      [
        { path: 'EmployeeList', component: EmployeeListComponent },
        {path: 'LeaveResquestList', component: LeaveResquestListComponent}
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
