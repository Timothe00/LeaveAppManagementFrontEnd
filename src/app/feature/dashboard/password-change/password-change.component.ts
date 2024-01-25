import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/core/models/password.interface';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent {
  user!: Users;

  pwChangeForm = new FormGroup({
    id: new FormControl(),
    newPassword: new FormControl('', [Validators.minLength(5)]),
  });

  constructor(private api: ApiService, private token: UserInTokenService) {}

  ngOnInit() {
    const userToken = this.token.getInfoUserToken();
    this.getUserById(+userToken.primarysid);
  }

  getUserById(id: number) {
    this.api.getUserByIdIntable(id).subscribe({
      next: (user: any) => {
        this.user = user;
        // Mettez à jour la valeur de id dans le formulaire
        this.pwChangeForm.patchValue({ id: user.id });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  changePassword() {
    if (this.pwChangeForm.valid) {
      const userId = this.pwChangeForm.value.id;
      const newPassword: UpdatePassword = {
        id: userId,
        password: this.pwChangeForm.value.newPassword as string,
      };

      this.api.updateUserPassword(newPassword).subscribe({
        next: (response: UpdatePassword) => {
          console.log('Mise à jour mot de passe', response);
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
        },
      });
    } else {
      console.log('Mot de passe incorrect ou non valide');
    }
  }
}



