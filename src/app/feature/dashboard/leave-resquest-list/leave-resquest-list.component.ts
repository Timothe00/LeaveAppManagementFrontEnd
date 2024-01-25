import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from 'src/app/core/models/leaveRequest.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService, StatusBody } from 'src/app/core/services/request/request.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-resquest-list',
  templateUrl: './leave-resquest-list.component.html',
  styleUrls: ['./leave-resquest-list.component.scss']
})
export class LeaveResquestListComponent {


  request: LeaveRequest[] = [];
  user!: Users;
  role!: string;

  page: number = 1;
  itemsPerPage: number=6;
  totalRequest: any;

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
          this.totalRequest = res.length;
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

    Swal.fire({
      title: "Etes-vous sûr?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je confirme!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Appel à la méthode de suppression ici
        this.api.updateRequestStatus(body)
          .subscribe({
            next: () => {
              // Mise à jour de la liste des demandes après la suppression
              this.getAllRequest();
              // Affichage de la confirmation de suppression
              Swal.fire({
                title: "Effectué avec succès",
                icon: "success"
              });
            },
            error: (err: any) => {
              Swal.fire({
                title: "Error!",
                text: "Une erreur s'est produite lors de l'opération.",
                icon: "error"
              });
            }
          });
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


  onClikToDelete(id: number): void {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je le supprime !"
    }).then((result) => {
      if (result.isConfirmed) {
        // Appel à la méthode de suppression ici
        this.api.deleteRequest(id)
          .subscribe({
            next: () => {
              // Mise à jour de la liste des demandes après la suppression
              this.getAllRequest();
              // Affichage de la confirmation de suppression
              Swal.fire({
                title: "Supprimé!",
                text: "Demande supprimée avec succès",
                icon: "success"
              });
            },
            error: (err: any) => {
              console.log(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, err);
              // Affichage d'une alerte d'erreur
              Swal.fire({
                title: "Error!",
                text: "Une erreur s'est produite lors de la suppression de la demande.",
                icon: "error"
              });
            }
          });
      }
    });
  }

}
