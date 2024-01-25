import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/core/models/resetPassword.model';
import { ResetPasswordService } from 'src/app/core/services/resetPassword/reset-password.service';
import ValidateForm from 'src/app/shared/helpers/ValidateForm';
import { confirmPasswordValidator } from 'src/app/shared/helpers/confirm-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {


  ResetPasswordForm!: FormGroup
  emailToReset!: string
  emailToken!: string
  resetPasswordObj = new ResetPassword()

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private root: Router,
    private resetPass: ResetPasswordService) {
    
  }

  ngOnInit(): void {
    this.ResetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: confirmPasswordValidator("password", "confirmPassword")
    });

    this.route.queryParams.subscribe(value=>{
      this.emailToReset= value['email'];
      let uriToken = value['code'];
      this.emailToken= value['code'];
      this.emailToken = uriToken.replace(/ /g, '+')
      // console.log(this.emailToReset);
      // console.log( this.emailToken); 
    })

  }

  reset() {
    if(this.ResetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.ResetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.ResetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetPass.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
  
          });
          Toast.fire({
            icon: "success",
            title: "Réinitialisé avec succès"
          });
          this.root.navigate(['dashboard/login']);
        },
        error:(err)=>{
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "error",
            title: "Une erreur est survenue lors de la réinitialisation."
          });
        }
      })
    }else{
      ValidateForm.validateAllFormFields(this.ResetPasswordForm)
    }
  }
    

}
