import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    PasswordForgotComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]

})
export class AuthentificationModule { }
