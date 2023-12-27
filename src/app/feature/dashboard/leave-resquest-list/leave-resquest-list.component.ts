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
      .subscribe(value => {
        const roleFromToken = this.auth.getRoleInToken();
        this.role = value || roleFromToken
      })
  }


  getUserById(id: number) {
    this.apiUser.getUserByIdIntable(id)
      .subscribe(
        {
          next: (user: any) => {
            console.log('user in token', user);
            this.user = user
          },
          error: (err: any) => {
            console.log(err);
          }
        })
  }


  
  filterRequestsByUserRole(requests: LeaveRequest[]): LeaveRequest[] {
    // Récupérer le rôle de l'utilisateur connecté
    const userRole = this.role;

    // Si l'utilisateur a le rôle de manager, renvoyer toutes les demandes
    if (userRole === 'Manager') {
      return requests;
    }

    // Si l'utilisateur n'est pas un manager, filtrer les demandes pour ne montrer que celles de l'utilisateur connecté
    const userToken = this.token.getInfoUserToken();
    const userId = +userToken.primarysid;

    return requests.filter(request => request.employeeId === userId);
  }


  getAllRequest(): void {
    this.api.getAllRequestInTable()
      .subscribe({
        next: (res: LeaveRequest[]) => {
          // Filtrer les demandes en fonction du rôle de l'utilisateur connecté
          this.request = this.filterRequestsByUserRole(res);
          console.log('response', this.request);

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
