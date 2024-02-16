import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../models/users';
import { Observable, catchError, throwError } from 'rxjs';
import { Role } from '../../models/role.model';
import { postUser } from '../../models/postUser.model';
import { updateUser } from '../../models/updateUser.model';
import { LeaveType } from '../../models/leaveType.model';
import { UpdatePassword } from '../../models/password.interface';
import { Reporting, ReportingByUser } from '../../models/reporting.model';
import { ReportingBalance } from '../../models/reportingBalance.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7240/api";
  // private roleUrl: string = "https://localhost:7240/api/Role";
  // private leaveUrl: string = "https://localhost:7240/api/LeaveType";
  // private stats: string = "https://localhost:7240/api/LeaveReporting"
  // private urlBalance: string = "https://localhost:7240/api/LeaveBalance";

  constructor(private http: HttpClient) { }

  //obtenir tous les utilisateurs
  getAllUserInTableAsync(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUrl}/Users`);
  }

  //Obtenir seulement un Utilisateur
  getUserByIdIntable(id: number){
    const urlId= `${this.baseUrl}/Users/${id}`;
    return this.http.get(urlId);
  }

  //supprimer un utilisateur
  deleteUserInTable(id: number){
   const urlDelete= `${this.baseUrl}/Users/${id}`;
   return this.http.delete(urlDelete);
  }

  //ajouter un utilisateur
  addUserInTable(data: postUser): Observable<postUser>{
    return this.http.post<postUser>(`${this.baseUrl}/Users/add`, data)
  }

  //Modifier un utilisateur
  UpdateUserInTable(id: number, data: updateUser): Observable<updateUser>{
    return this.http.put<updateUser>(`${this.baseUrl}/Users/${id}`, data)
  }

  //modifier uniquement le mot de passe
  updateUserPassword(body: UpdatePassword): Observable<UpdatePassword> {
    const url = `${this.baseUrl}/Users/password`;
    return this.http.put<UpdatePassword>(url, body);
  }


    //Renvoie tous les utilisateurs avec pagination
    getUsersWithPagination(pageNumber: number, pageSize: number): Observable<Users[]> {
      const url = `${this.baseUrl}/Users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      return this.http.get<Users[]>(url).pipe(
        catchError(this.handleError)
      );
    }


  //obtenir tous les roles
  getRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.baseUrl}/Role`)
  }

  //obtenir tous les congés
   getLeaveType(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(`${this.baseUrl}/LeaveType`)
   }

   //obtenir les statistiques de tous les utilisateurs
   getStatisticOfAllUser(role: string): Observable<Reporting[]> {
    // on s'assure que le rôle est valide (manager ou admin)
    const validRoles = ['Manager', 'Admin'];
    if (!validRoles.includes(role)) {
      throw new Error('Rôle invalide. Le rôle doit être "Manager" ou "Admin".');
    }
  
    // Construire les paramètres de la requête
    const params = new HttpParams().set('role', role);
  
    // Ajout des paramètres à l'URL
    const urlWithParams = `${this.baseUrl}/LeaveReporting?${params.toString()}`;
  
    // Faire la requête HTTP
    return this.http.get<Reporting[]>(urlWithParams);
  }

    //obtenir les statistiques de tous les utilisateurs
   getStatisticByUser(id: number):Observable<ReportingByUser>{
    return this.http.get<ReportingByUser>(`${this.baseUrl}/LeaveReporting/${id}`)
   }

   //obtenir les statistiques de tous les utilisateurs
   getReportingBalance(empId: number):Observable<ReportingBalance>{
    return this.http.get<ReportingBalance>(`${this.baseUrl}/LeaveBalance?employId=${empId}`)
   }


   private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error (HTTP ${error.status}): ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

