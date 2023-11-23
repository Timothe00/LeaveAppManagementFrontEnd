import { Component } from '@angular/core';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  users: Users[] = [];
  constructor(private api: ApiService) { }
 
  ngOnInit(): void{
    this.fetchAllAllUser();
  }


  fetchAllAllUser(): void {
    this.api.getAllUserInTableAsync()
      .subscribe({
        next: (res: Users[]) => {
          this.users = res;
          console.log(res);    
        },
        error: (err: any) => {
          console.log(err); 
        }
      });
  }
}
