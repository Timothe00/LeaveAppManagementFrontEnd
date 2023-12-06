import { Component } from '@angular/core';
import { LeaveRequest } from 'src/app/core/models/leaveRequest.model';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-leave-resquest-list',
  templateUrl: './leave-resquest-list.component.html',
  styleUrls: ['./leave-resquest-list.component.scss']
})
export class LeaveResquestListComponent {
  request: LeaveRequest[] = [];
  //user!: Users;
  constructor(private api: RequestService) { }

  ngOnInit(): void {
    this.fetchAllAllUser();
  }


  fetchAllAllUser(): void {
    this.api.getAllRequestInTable()
      .subscribe({
        next: (res: LeaveRequest[]) => {
          this.request = res;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }
}
