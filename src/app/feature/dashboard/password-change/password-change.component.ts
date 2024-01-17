import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/core/models/password.interface';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent {

  pwChangeForm = new FormGroup({
    id: new FormControl(), 
    current:  new FormControl('', [Validators.minLength(5)]),
    newPW: new FormControl('', [Validators.minLength(5)]),
    confirm: new FormControl('', [Validators.minLength(5)]),
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    // this.pwChangeForm = this.fb.group({
    //     current: ['', Validators.required],
    //     newPW: ['', Validators.required],
    //     confirm: ['', Validators.required]
    // });
    // this.current = this.pwChangeForm.controls['current'];
    // this.newPW = this.pwChangeForm.controls['newPW'];
    // this.confirm = this.pwChangeForm.controls['confirm'];
}

changePassword() {
  if (this.pwChangeForm.controls.newPW.value == this.pwChangeForm.controls.confirm.value) {
    const userId = this.pwChangeForm.value.id;
    const newPassword: UpdatePassword = {
      id: userId,
      password: this.pwChangeForm.value.current as string
    }
  
    this.api.updateUserPassword(newPassword).subscribe({
      next: (response: UpdatePassword) => {
        console.log('Mise à jour mot de passe', response);
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
      }
    });
 }else{
  console.log("error password incorrect");
 }

}

}


