import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Users } from '../../models/users';
// import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'

export interface InfoUserToken {
  primarysid: string
  unique_name: string
  role: string
  nbf: number
  exp: number
  iat: number
}

@Injectable({
  providedIn: 'root'
})

//nous allons identifier l'utilisateur connecté qui dans le token
export class UserInTokenService {
  private primarysId$ = new BehaviorSubject<string>("1");
  private unique_name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  
  constructor() { }

//Renvoie un observable qui peut être utilisé pour suivre les changements du nom complet de l'utilisateur.
  public getUserFromToken(){
    return this.unique_name$.asObservable();
  }

  //Mettre à jour le BehaviorSubject unique_name$ avec le nouveau nom complet de l'utilisateur
  public setUserFromToken(unique_name: string){
    this.unique_name$.next(unique_name);
  }



  //Renvoie un observable qui peut être utilisé pour suivre les changements du rôle de l'utilisateur.
  getUserRoleFromToken(){  
    return this.role$.asObservable();
  }

  //Mettre à jour le BehaviorSubject role$ avec le nouveau rôle de l'utilisateur, notifiant ainsi tous les abonnés de ce changement.
  setRoleFromToken(role:string){
    this.role$.next(role)
  }


  //Renvoie un observable qui peut être utilisé pour suivre les changements du rôle de l'utilisateur.
  getUserprimarysIdFromToken(){  
    return this.primarysId$.asObservable();
  }
  
  //Mettre à jour le BehaviorSubject role$ avec le nouveau rôle de l'utilisateur, notifiant ainsi tous les abonnés de ce changement.
  setprimarysIdFromToken(primarysId:string){
    this.primarysId$.next(primarysId)
  }

  getInfoUserToken() {
    let userTokenInfo: InfoUserToken = {
      primarysid:"",
      role: '',
      unique_name:'',
      exp: 0,
      iat: 0,
      nbf: 0,
    };

    let token = localStorage.getItem('token');

    if (token != null) {
      const decode: InfoUserToken = jwtDecode<InfoUserToken>(token);
      userTokenInfo.primarysid = decode.primarysid;
      userTokenInfo.unique_name = decode.unique_name;
      userTokenInfo.role = decode.role;
      userTokenInfo.exp = decode.exp;
      userTokenInfo.iat = decode.iat;
      userTokenInfo.nbf = decode.nbf;
    }

    return userTokenInfo;
  }
}


//npm i @auth0/angular-jwt: ce package sera utilisé pour decrypter le token au niveau de authService