import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/core/models/userLogin.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email!: string
  password!: string

  profileForm = new FormGroup({
    email: new FormControl('david.jones@example.com', [Validators.required, Validators.email]),
    password: new FormControl('manager2password', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private auth: AuthService, private route: Router) {}

  // getFormControlErrorText(ctrl: AbstractControl) {
  //   if (ctrl.hasError('required')) {
  //     return 'Ce champ est requis';
  //   } else if (ctrl.hasError('email')) {
  //     return "Merci d'entrer une adresse mail valide";
  //   } else if (ctrl.hasError('minlength')) {
  //     return 'Veuillez saisir au moins 5 caractères';
  //   } else if (ctrl.hasError('maxlength')) {
  //     return 'Trop long';
  //   } else {
  //     return 'Ce champ contient une erreur';
  //   }
  // }

  ngOnInit(): void {
    
    if (this.auth.isLoggedIn()) {
        this.route.navigate(['dashboard']);
    }
  }

  onSubmit() {
    //console.log(this.profileForm.value);
    const userInfo: UserLogin = {
      email: this.profileForm.value.email as string,
      password: this.profileForm.value.password as string,
    };

    this.auth.login(userInfo).subscribe({
      next:(res)=>{
        this.profileForm.reset()
        this.auth.storeToken(res.token);
        this.route.navigate(['dashboard'])

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
      }
    })

  }

  // private validateAllFormFields(profileForm:FormGroup){
  //   Object.keys(profileForm.controls).forEach(field =>{
  //     const control = profileForm.get(field);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf: true});
  //     }else if(control instanceof FormGroup){
  //       this.validateAllFormFields(control)
  //     }
  //   })
  // }


}
