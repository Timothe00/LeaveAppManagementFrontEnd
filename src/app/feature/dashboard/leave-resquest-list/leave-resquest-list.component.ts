import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from 'src/app/core/models/leaveRequest.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService, StatusBody } from 'src/app/core/services/request/request.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-leave-resquest-list',
  templateUrl: './leave-resquest-list.component.html',
  styleUrls: ['./leave-resquest-list.component.scss']
})
export class LeaveResquestListComponent {


  request: LeaveRequest[] = [];
  user!: Users;
  primarysId!: string
  role!: string;
  
  constructor(
    private api: RequestService, 
    private apiUser: ApiService, 
    private token: UserInTokenService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const userToken = this.token.getInfoUserToken()
    this.getUserById(+userToken.primarysid)

    this.getAllRequest();

    this.token.getUserRoleFromToken()
    .subscribe(value =>{
      const roleFromToken = this.auth.getRoleInToken();
      this.role = value|| roleFromToken
    })
  }


  getUserById(id: number) {
    this.apiUser.getUserByIdIntable(id)
      .subscribe(
        {
          next: (user: any) => {
            console.log('user to token', user);
            this.user = user
          },
          error: (err: any) => {
            console.log(err);
          }
        })
  }


  getAllRequest(): void {
    this.api.getAllRequestInTable()
      .subscribe({
        next: (res: LeaveRequest[]) => {
          this.request = res
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }



  updateStatus(id: number, status: string): void {
    const body: StatusBody = {
      id,
      requestStatus: status
    }
    this.api.updateRequestStatus(body).subscribe({
      next: (response: StatusBody) => {
        console.log(response);
      },
      error: (error: any) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    });
  }


  getStatus(status: string): string {
    if (status === 'Accepted') {
      return 'Accepter'
    }
    if (status === 'Rejected') {
      return 'Refuser'
    }
    return 'En attente'
  }


  onClikToUpdate(id: number) {
    this.router.navigate([`dashboard/leave-request-form/edit/${id}`]);
  }

}
