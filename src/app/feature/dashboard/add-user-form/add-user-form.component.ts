import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostUser } from 'src/app/core/models/postUser.model';
import { Role } from 'src/app/core/models/role.model';
import { User } from 'src/app/core/models/updateUser.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  data!: PostUser;
  roles!: Role[];
  userUpdate!: User;

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  addUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    roleId: new FormControl(1, [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    isActiveUser: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {

    //appelle de la methode 
    this.getUserById()

    this.api.getRole().pipe().subscribe((res) => {
      this.roles = res
    })
  }

  getUserById() {
    const userId = this.route.snapshot.params['id'];
    this.api.getUserByIdIntable(userId).subscribe({
      next: (val: any) => {
        this.userUpdate = val
        this.addUserForm.setValue({
          firstName: this.userUpdate.firstName,
          lastName: this.userUpdate.lastName,
          job: this.userUpdate.job,
          email: this.userUpdate.email,
          phoneNumber: this.userUpdate.phoneNumber,
          roleId: this.userUpdate.roleId,
          password: '', // ou this.userUpdate.password
          isActiveUser: this.userUpdate.isActiveUser,
        });
        console.log('Succès', this.userUpdate);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'accès à l\'utilisateur', err);
      }
    })
  }


  onSubmit() {
    if (this.userUpdate) {
      this.api.UpdateUserInTable(this.userUpdate.id, this.userUpdate).subscribe({
        next: (val: any) => {
          this.userUpdate = val
          console.log('Succès', this.userUpdate);
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
        }
      })
    } else {
      const data: PostUser = {
        email: this.addUserForm.value.email as string,
        firstName: this.addUserForm.value.firstName as string,
        lastName: this.addUserForm.value.lastName as string,
        isActiveUser: true,
        password: this.addUserForm.value.password as string,
        phoneNumber: this.addUserForm.value.phoneNumber as string,
        roleId: this.addUserForm.value.roleId as number,
        job: this.addUserForm.value.job as string
      }

      Swal.fire({
        title: "vous êtes sur le point de créer un nouvel utilisateur",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: `Stopper`,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Créer!"
      }).then((result) => {
        if (result.isConfirmed) {
          // Appel à la méthode de creation ici
          this.api.addUserInTable(data)
            .subscribe({
              next: () => {
                // Affichage de la confirmation de creation
                Swal.fire({
                  title: "Créé",
                  text: "Nouvel Utilisateur crée avec succès",
                  icon: "success"
                });
                this.router.navigate(['dashboard/EmployeeList']);
              },
              error: () => {
                // Affichage d'une alerte d'erreur
                Swal.fire({
                  title: "Error!",
                  text: "Une erreur s'est produite lors de la création de l'utilisateur.",
                  icon: "error"
                });
              }
            });
        }
      });
    }
  }





}
