import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/core/models/userLogin.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // email!: string
  // password!: string
  isLoading: boolean = false;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private auth: AuthService, private route: Router, private token: UserInTokenService) {}

  ngOnInit(): void {
    
    if (this.auth.isLoggedIn()) {
        this.route.navigate(['dashboard/home']);
    }
  }

  onSubmit() {
    //lancer le chargement
    this.isLoading = true;

    const userInfo: UserLogin = {
      email: this.profileForm.value.email as string,
      password: this.profileForm.value.password as string,
    };
    this.auth.login(userInfo).subscribe({
      next:(res)=>{
        this.profileForm.reset()
        this.auth.storeToken(res.token);
        const tokenPayload = this.auth.decodedToken();
        
        this.token.setUserFromToken(tokenPayload.unique_name);
        this.token.setRoleFromToken(tokenPayload.role);
        this.route.navigate(['dashboard/home'])
        
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,

        });
        Toast.fire({
          icon: "success",
          title: "Connecté avec succès"
        });
        //arrêter le loading après la connexion
        this.isLoading = false;
      }, 
      error:()=>{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: "Veuillez remplir correctement les champs svp!!"
        });
        this.isLoading = false;
      }  
    })
  }
}
