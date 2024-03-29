import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/core/services/resetPassword/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent {

  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  isLoading: boolean = false;

  constructor(private reset: ResetPasswordService, private route: Router) {}


  checkValidEmail(event: string){
    const value = event;
    const pattern=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    this.isValidEmail = pattern.test(value)
    return this.isValidEmail
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.isLoading = true;
      this.reset.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next: (res)=>{
          this.resetPasswordEmail="";
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
          Toast.fire({
            icon: "success",
            title: "Super! veuiller consulter votre boîte e-mail"
          });
          this.isLoading = false;
          this.route.navigate(['login']);
        },
        error:(err)=>{
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "error",
            title: "Cette adresse e-mail n'existe pas!"
          });
          this.isLoading = false;
        }
      })
    }
  }
}
