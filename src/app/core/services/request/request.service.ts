import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../../models/leaveRequest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private reqUrl: string ='https://localhost:7240/api/LeaveRequest'
  constructor(private http: HttpClient) { }


  getAllRequestInTable(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(this.reqUrl); 
  }
}
