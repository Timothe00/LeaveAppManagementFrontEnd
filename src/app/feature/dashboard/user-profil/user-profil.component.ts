import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent {
roles!: Role[];
user!: Users;

isHidden: boolean = true; // hidden par defaut

fullName!: string;
role!: string;
constructor(
  private userToken: UserInTokenService, 
  private auth: AuthService, 
  private api: ApiService,
  private token: UserInTokenService,) {}

  userForm = new FormGroup({
  id: new FormControl(),  // Vous pouvez également le désactiver pour qu'il ne soit pas modifiable
  firstName: new FormControl('', [Validators.required]),
  lastName: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  job: new FormControl('', [Validators.required]),
  phoneNumber: new FormControl('', [Validators.required]),
  roleId: new FormControl(1, [Validators.required]),
  password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  isActiveUser: new FormControl(true, [Validators.required]), 
});


ngOnInit(){
  const userToken = this.token.getInfoUserToken()
  this.getUserById(+userToken.primarysid)

  this.userToken.getUserFromToken()
  .subscribe(data=>{
    let fullNameFromToken = this.auth.getfullNameInToken();
    this.fullName = data || fullNameFromToken  
  })

  this.api.getRole().pipe().subscribe((res: Role[]) => {
    this.roles = res
  })
}

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


onSubmit() {
  throw new Error('Method not implemented.');
}

}
