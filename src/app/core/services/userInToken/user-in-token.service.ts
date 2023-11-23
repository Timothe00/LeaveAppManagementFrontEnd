import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//nous allons identifier l'utilisateur connecté qui dans le token
export class UserInTokenService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

//Renvoie un observable qui peut être utilisé pour suivre les changements du nom complet de l'utilisateur.
  public getUserFromToken(){
    return this.fullName$.asObservable();
  }

  //Mettre à jour le BehaviorSubject fullName$ avec le nouveau nom complet de l'utilisateur
  public setUserFromToken(fullname: string){
    this.fullName$.next(fullname);
  }

  //Renvoie un observable qui peut être utilisé pour suivre les changements du rôle de l'utilisateur.
  getUserRoleFromToken(){
    return this.role$.asObservable();
  }

  //Mettre à jour le BehaviorSubject role$ avec le nouveau rôle de l'utilisateur, notifiant ainsi tous les abonnés de ce changement.
  setRoleFromToken(role:string){
    this.role$.next(role)
  }

}
//npm i @auth0/angular-jwt: ce package sera utilisé pour decrypter le token au niveau de authService