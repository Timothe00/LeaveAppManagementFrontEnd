import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../models/userLogin.model';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin!: UserLogin;
  private baseUrl: string = 'https://localhost:7240/api/Login';
  //environment.apiUr

  private userPayload: any;

  constructor(private http: HttpClient, private route: Router) {
    this.userPayload = this.decodedToken();
  }

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post(`${this.baseUrl}`, userLogin)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  signOut() {
    localStorage.removeItem('token');
    this.route.navigate(['auth/login'])
  }


  //methode pour decoder le token.
  //decodedToken retourne un payload donc on doit nous creer un payload qui sera initialisé dans le constructeur
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }


  getfullNameInToken() {
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleInToken() {
    if (this.userPayload)
    return this.userPayload.role;
  }

  getIdInToken() {
    if (this.userPayload)
    return this.userPayload.primarysId;
  }
} 
