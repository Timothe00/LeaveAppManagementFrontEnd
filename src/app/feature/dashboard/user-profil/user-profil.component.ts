import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/core/models/password.interface';
import { Role } from 'src/app/core/models/role.model';
import { updateUser } from 'src/app/core/models/updateUser.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent {

roles!: Role[];
user!: Users;
updateData!: updateUser;

isHidden: boolean = true; // hidden par defaut

fullName!: string;
role!: string;
userRole!: string;
passwordVisible = false;

constructor(
  private userToken: UserInTokenService, 
  private auth: AuthService, 
  private api: ApiService,
  private token: UserInTokenService,) {}

  userForm = new FormGroup({
  id: new FormControl(),  
  firstName: new FormControl('', [Validators.required]),
  lastName: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  job: new FormControl('', [Validators.required]),
  phoneNumber: new FormControl('', [Validators.required]),
  totaLeaveAvailable: new FormControl(1, [Validators.required]),
  roleId: new FormControl(1, [Validators.required]),
  password: new FormControl('', [Validators.minLength(5)]),
  hireDate: new FormControl(new Date, [Validators.required]),
});

ngOnInit(){
  
  const userToken = this.token.getInfoUserToken();
  const userRole = userToken.role;
  // Condition pour désactiver le champ si le rôle est "Employee"
  if (userRole === "Employee") {
    this.userForm.get('totaLeaveAvailable')?.disable();
  } else {
    // Assurez-vous de réactiver le champ si le rôle n'est pas "Employee"
    this.userForm.get('totaLeaveAvailable')?.enable();
  }

  this.getUserById(+userToken.primarysid)
  //this.updatePassword(+userToken.primarysid, this.txt)
  this.userToken.getUserFromToken()
  .subscribe(data=>{
    let fullNameFromToken = this.auth.getfullNameInToken();
    this.fullName = data || fullNameFromToken  
  })

  this.api.getRole().pipe().subscribe((res: Role[]) => {
    this.roles = res
  })
}

//obtenir un utilisateur par son Id
getUserById(userId: number): void {
  this.api.getUserByIdIntable(userId).subscribe({
    next: (val: any) => {
      console.log(val);
      this.userForm.patchValue(val);
    },
    error: (err: any) => {
      console.error('Erreur lors de l\'accès à l\'utilisateur', err);
    }
  });
}

//mettre à jour le mot de passe d'un utilisateur
updatePassword(id: number, text: string): void {
  const body: UpdatePassword = {
    id,
    password: text
  }
  this.api.updateUserPassword(body).subscribe({
    next: (res: UpdatePassword) => {
      console.log(res);
    },
    error: (error: any) => {
      console.error('Erreur lors de la mise à jour du mot de passe', error);
    }
  });
}
//methode soummission
onSubmit() {
  if (this.userForm.valid) {
    const userId = this.userForm.value.id;
    const updateUser: updateUser = {
      id: userId,
      firstName: this.userForm.value.firstName as string,
      lastName: this.userForm.value.lastName as string,
      email: this.userForm.value.email as string,
      phoneNumber: this.userForm.value.phoneNumber as string,
      roleId: this.userForm.value.roleId as number,
      job: this.userForm.value.job as string,
      hireDate: this.userForm.value.hireDate as Date
    };
 
    this.api.UpdateUserInTable(userId, updateUser).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: "Super!",
          text: "Informations personnelles modifiée avec succès!",
          icon: "success"
        });
      },
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erreur lors de la modification"
        });
      }
    });
  }
 }

 onPasswordChange() {
  if (this.userForm.controls.password.valid) {
    const userId = this.userForm.value.id;
    const newPassword: UpdatePassword = {
      id: userId,
      password: this.userForm.value.password as string
    }
 
    this.api.updateUserPassword(newPassword).subscribe({
      next: (response: UpdatePassword) => {
        Swal.fire({
          title: "Super!",
          text: "Modification éffectuée avec succès!",
          icon: "success"
        });
      },
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erreur lors de la modification"
        });
      }
    });
  }
}
//gestion de la visibilité du mot de passe
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

}
