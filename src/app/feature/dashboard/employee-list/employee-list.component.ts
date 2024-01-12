import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  users: Users[] = [];
  //user!: Users;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
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


  onDelete(id: number): void {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !"
    }).then((result) => {
      if (result.isConfirmed) {
        // Appel à la méthode de suppression ici
        this.api.deleteUserInTable(id)
          .subscribe({
            next: () => {
              // Mise à jour de la liste des utilisateurs après la suppression
              this.fetchAllAllUser();
              // Affichage de la confirmation de suppression
              Swal.fire({
                title: "Supprimé!",
                text: "Utilisateur supprimé avec succès",
                icon: "success"
              });
            },
            error: (err: any) => {
              console.log(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, err);
              // Affichage d'une alerte d'erreur
              Swal.fire({
                title: "Error!",
                text: "Une erreur s'est produite lors de la suppression de l'utilisateur.",
                icon: "error"
              });
            }
          });
      }
    });
  }


  onUpdate(id: number) {
    this.router.navigate([`dashboard/EmployeeList/edit/${id}`]);
  }

  clikTodetail(idUser: number){
    this.router.navigate([`dashboard/user-detail/details/${idUser}`]);
  }

}
