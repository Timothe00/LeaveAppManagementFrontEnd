import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User.model';
import { Role } from 'src/app/core/models/role.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  data!: User;
  roles!: Role[];
 

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  addUserForm = new FormGroup({
    id : new FormControl(),
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
        this.addUserForm.setValue({
          id: val.id,
          firstName: val.firstName || '',
          lastName: val.lastName || '',
          job: val.job || '',
          email: val.email || '',
          phoneNumber: val.phoneNumber || '',
          roleId: val.roleId || 1,
          password: val.password || '',
          isActiveUser: val.isActiveUser || true,
        });
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'accès à l\'utilisateur', err);
      }
    })
  }


  onSubmit() {
    console.log("result", this.addUserForm.value);
    if (this.addUserForm.valid) {
      
      this.api.UpdateUserInTable(this.addUserForm.value.id, this.data).subscribe({
        next: (response: any) => {
          this.data = response
          console.log("update", this.data);
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
        }
      })
    } else {
      const data: User = {
        id: this.addUserForm.value as number,
        email: this.addUserForm.value as string,
        firstName: this.addUserForm.value as string,
        lastName: this.addUserForm.value as string,
        isActiveUser: this.addUserForm.value as unknown as boolean,
        password: this.addUserForm.value as string,
        phoneNumber: this.addUserForm.value as string,
        roleId: this.addUserForm.value as number,
        job: this.addUserForm.value as string
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
