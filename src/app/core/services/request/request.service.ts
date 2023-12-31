import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../../models/leaveRequest.model';
import { Observable } from 'rxjs';
import { postLeave } from '../../models/postLeave';
import { UpdateLeave } from '../../models/updateLeave.model';

export interface StatusBody {
  id: number
  requestStatus: string
}


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private reqUrl: string ='https://localhost:7240/api/LeaveRequest'

  constructor(private http: HttpClient) { }


  getAllRequestInTable(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(this.reqUrl); 
  }

  getRequestByIdInTable(id: number){
    const urlId= `${this.reqUrl}/${id}`;
    return this.http.get(urlId);
  }

  addRequestInTable(data: postLeave): Observable<postLeave>{
    return this.http.post<postLeave>(this.reqUrl, data)
  }

  updateRequestInTable(id: number, data: UpdateLeave): Observable<UpdateLeave>{
    return this.http.put<UpdateLeave>(`${this.reqUrl}/${id}`, data)
  }

  updateRequestStatus(body: StatusBody): Observable<StatusBody> {
    const url = `${this.reqUrl}/status`;
    return this.http.put<StatusBody>(url, body);
  }





  
}
