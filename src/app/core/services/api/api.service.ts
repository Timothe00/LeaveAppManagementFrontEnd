import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';
import { Role } from '../../models/role.model';
import { postUser } from '../../models/postUser.model';
import { updateUser } from '../../models/updateUser.model';
import { LeaveType } from '../../models/leaveType.model';
import { UpdatePassword } from '../../models/password.interface';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7240/api/Users";
  // private apiUrl: string = "https://localhost:7240/api/Users/add";
  private roleUrl: string = "https://localhost:7240/api/Role";
  private leaveUrl: string = "https://localhost:7240/api/LeaveType";

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
  addUserInTable(data: postUser): Observable<postUser>{
    return this.http.post<postUser>(`${this.baseUrl}/add`, data)
  }

  //Modifier un utilisateur
  UpdateUserInTable(id: number, data: updateUser): Observable<updateUser>{
    return this.http.put<updateUser>(`${this.baseUrl}/${id}`, data)
  }

  //modifier uniquement le mot de passe
  updateUserPassword(body: UpdatePassword): Observable<UpdatePassword> {
    const url = `${this.baseUrl}/password`;
    return this.http.put<UpdatePassword>(url, body);
  }


  //obtenir tous les roles
  getRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.roleUrl}`)
  }

  //obtenir tous les congés
   getLeaveType(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(`${this.leaveUrl}`)
   }

}
