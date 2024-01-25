import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../models/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  url: string = "https://localhost:7240/api/Users"
  
  constructor(private http: HttpClient) { }
// reset-password

sendResetPasswordLink(email: string){
  return this.http.post<any>(`${this.url}/send-reset-email/${email}`, {})
}

resetPassword(resetPasswordObj: ResetPassword){
  return this.http.post<any>(`${this.url}/reset-password`, resetPasswordObj)
}

}
