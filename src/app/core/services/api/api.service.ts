import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7240/api/Users";
 
  constructor(private http: HttpClient) { }

  //obtenir tous les utilisateurs
  getAllUserInTableAsync(): Observable<Users[]>{
    return this.http.get<Users[]>(this.baseUrl); 
  }

  deleteUserInTable(id: any){
   const urlDelete= `${this.baseUrl}/${id}`;
   return this.http.delete(urlDelete);
  }


}
