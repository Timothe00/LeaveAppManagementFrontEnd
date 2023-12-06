import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';
import { PostUser } from '../../models/postUser.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/updateUser.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7240/api/Users";
  private apiUrl: string = "https://localhost:7240/api/Users/add";
  private roleUrl: string = "https://localhost:7240/api/Role";

  constructor(private http: HttpClient) { }

  //obtenir tous les utilisateurs
  getAllUserInTableAsync(): Observable<Users[]>{
    return this.http.get<Users[]>(this.baseUrl); 
  }

  //Obtenir seulement un Utilisateur
  getUserByIdIntable(id: number){
    const urlId= `${this.baseUrl}/${id}`;
    return this.http.get(urlId);
  }

  //supprimer un utilisateur
  deleteUserInTable(id: number){
   const urlDelete= `${this.baseUrl}/${id}`;
   return this.http.delete(urlDelete);
  }

  //ajouter un utilisateur
  addUserInTable(data: PostUser): Observable<PostUser>{
    return this.http.post<PostUser>(`${this.apiUrl}`, data)
  }

  //Modifier un utilisateur
  UpdateUserInTable(id: number, data: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${id}`, data)
  }

  //obtenir tous les roles
  getRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.roleUrl}`)
  }

}
