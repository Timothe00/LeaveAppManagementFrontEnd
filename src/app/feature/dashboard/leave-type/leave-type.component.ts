import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveType } from 'src/app/core/models/leaveType.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent {

  leaves!: LeaveType[];
  page: number = 1;
  itemsPerPage: number=5;
  totalUser: any;
  constructor(private api: ApiService) {}

MyLeaveForm: FormGroup = new FormGroup({
  leavetype: new FormControl('', [Validators.required]),
});

ngOnInit(): void {
  this.api.getLeaveType().pipe().subscribe((res) => {
    this.leaves = res
  })
}



onSubmit(): void{
  if (this.MyLeaveForm.valid) {
      this.confirmAndCreateUser();
  }
}

private confirmAndCreateUser(): void {
  const createLeave: LeaveType = {
    leaveTypeName: this.MyLeaveForm.value.leavetype,
    id: 0
  };
  this.createUser(createLeave);
}

  //fonction la creation d'un type de congé
  private createUser(postLeave: LeaveType): void {
    this.api.addLeaveType(postLeave).subscribe({
      next: (response: LeaveType) => {
        // Mise à jour de la liste des congés après la suppression
        this.api.getLeaveType().pipe().subscribe((res) => {
        this.leaves = res})
        this.handleUserCreationSuccess();
      },
      error: () => {
        this.handleUserCreationError();
      },
    });

  }

    //fonction pour afficher un message que la création a été effectuée avec succes
    private handleUserCreationSuccess(): void {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
      });
      Toast.fire({
        icon: "success",
        title: "ajouté avec succès"
      });
    }
    //fonction pour afficher un message d'erreur en cas d'echec lors de la création
    private handleUserCreationError(): void {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
      });
      Toast.fire({
        icon: "error",
        title: "ajout de congé echoué"
      });
    }


    //supprimer un congé
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
          this.api.deleteLeaveType(id)
            .subscribe({
              next: () => {
                // Mise à jour de la liste des congés après la suppression
                this.api.getLeaveType().pipe().subscribe((res) => {
                this.leaves = res

                })
                // Affichage de la confirmation de suppression
                Swal.fire({
                  title: "Supprimé!",
                  text: "Type de congé supprimé avec succès",
                  icon: "success"
                });
              },
              error: (err: any) => {
                Swal.fire({
                  title: "Error!",
                  text: "Une erreur s'est produite lors de la suppression",
                  icon: "error"
                });
              }
            });
        }
      });
    }

}
