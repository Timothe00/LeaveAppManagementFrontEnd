import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postUser } from 'src/app/core/models/postUser.model';
import { Role } from 'src/app/core/models/role.model';
import { updateUser } from 'src/app/core/models/updateUser.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  data!: postUser;
  updateData!: updateUser;
  roles!: Role[];
  isUpdate: boolean= false;
  currentForm!: FormGroup;
  
  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  addUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    totaLeaveAvailable: new FormControl(30, [Validators.required]),
    roleId: new FormControl(1, [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    isActiveUser: new FormControl(true, [Validators.required]),
  });


  updateUserForm = new FormGroup({
    id: new FormControl(),  // 
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    job: new FormControl('', [Validators.required]),
    totaLeaveAvailable: new FormControl(30, [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    roleId: new FormControl(1, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isActiveUser: new FormControl(true, [Validators.required]), 
  });

  ngOnInit(): void {

    const userId = this.route.snapshot.params['id'];
    this.isUpdate = !!userId;

    if (this.isUpdate) {
      this.currentForm = this.updateUserForm;
      this.getUserById(userId);
    } else {
      this.currentForm = this.addUserForm;
    }
    
    this.api.getRole().pipe().subscribe((res: Role[]) => {
      this.roles = res
    })
  }

  getUserById(userId: number): void {
    this.api.getUserByIdIntable(userId).subscribe({
      next: (val: any) => {
        this.updateUserForm.patchValue(val);
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'accès à l\'utilisateur', err);
      }
    });
  }



  onUserCreate(): void {
    if (this.currentForm.valid) {
      if (this.isUpdate) {
        this.confirmAndupdateUser();
      } else {
        this.confirmAndCreateUser();
      }
    }
  }
  
  private confirmAndupdateUser(): void {
    const userId = this.currentForm.value.id;
    const updateUser: updateUser = {
      id: userId,
      firstName: this.updateUserForm.value.firstName as string,
      lastName: this.updateUserForm.value.lastName as string,
      email: this.updateUserForm.value.email as string,
      totaLeaveAvailable: this.updateUserForm.value.totaLeaveAvailable as number,
      isActiveUser: true,
      password: this.updateUserForm.value.password as string,
      phoneNumber: this.updateUserForm.value.phoneNumber as string,
      roleId: this.updateUserForm.value.roleId as number,
      job: this.updateUserForm.value.job as string,
    };
  
    this.api.UpdateUserInTable(userId, updateUser).subscribe({
      next: (response: any) => {
        console.log('Mise à jour utilisateur', response);
        // Gérer la confirmation de mise à jour
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
        // Gérer l'erreur de mise à jour
      },
    });
  }
  
  private confirmAndCreateUser(): void {
    const postUser: postUser = {
      firstName: this.addUserForm.value.firstName as string,
      lastName: this.addUserForm.value.lastName as string,
      email: this.addUserForm.value.email as string,
      totaLeaveAvailable: this.addUserForm.value.totaLeaveAvailable as number,
      isActiveUser: true,
      password: this.addUserForm.value.password as string,
      phoneNumber: this.addUserForm.value.phoneNumber as string,
      roleId: this.addUserForm.value.roleId as number,
      job: this.addUserForm.value.job as string,
    };
  
    Swal.fire({
      title: "Vous êtes sur le point de créer un nouvel utilisateur",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: `Stopper`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Créer!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.createUser(postUser);
      }
    });
  }
  
  
  private createUser(postUser: postUser): void {
    this.api.addUserInTable(postUser).subscribe({
      next: (response: postUser) => {
        console.log('Ajout utilisateur', response);
        this.handleUserCreationSuccess();
      },
      error: () => {
        this.handleUserCreationError();
      },
    });
  }
  
  private handleUserCreationSuccess(): void {
    Swal.fire({
      title: "Créé",
      text: "Nouvel Utilisateur créé avec succès",
      icon: "success",
    });
    this.router.navigate(['dashboard/EmployeeList']);
  }
  
  private handleUserCreationError(): void {
    Swal.fire({
      title: "Erreur!",
      text: "Une erreur s'est produite lors de la création de l'utilisateur.",
      icon: "error",
    });
  }

  
}

