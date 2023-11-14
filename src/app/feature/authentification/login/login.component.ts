import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/core/models/userLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email!: string
  password!: string
  
  profileForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.maxLength(5)]),
  });

  constructor() {}

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Veuillez saisir au moins 5 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Trop long';
    } else {
      return 'Ce champ contient une erreur';
    }
  }


  onSubmit() {
    console.log(this.profileForm.value);
    const userInfo: UserLogin = {
      email: this.profileForm.value.email as string,
      password: this.profileForm.value.password as string,
    };
  }
}
