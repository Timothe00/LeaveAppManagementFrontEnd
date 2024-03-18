import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../../models/leaveRequest.model';
import { Observable } from 'rxjs';
import { postLeave } from '../../models/postLeave';
import { UpdateLeave } from '../../models/updateLeave.model';
import { AllReqAccpted } from '../../models/allReqAccepted.model';

export interface StatusBody {
  id: number
  requestStatus: string
}


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private reqUrl: string ='https://localhost:7240/api'
  constructor(private http: HttpClient) { }

  getAllRequestInTable(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(`${this.reqUrl}/LeaveRequest`); 
  }

  getRequestByIdInTable(id: number){
    const urlId= `${this.reqUrl}/LeaveRequest/${id}`;
    return this.http.get(urlId);
  }

  addRequestInTable(data: postLeave): Observable<postLeave>{
    return this.http.post<postLeave>(`${this.reqUrl}/LeaveRequest`, data)
  }

  updateRequestInTable(id: number, data: UpdateLeave): Observable<UpdateLeave>{
    return this.http.put<UpdateLeave>(`${this.reqUrl}/LeaveRequest/${id}`, data)
  }

  updateRequestStatus(body: StatusBody): Observable<StatusBody> {
    const url = `${this.reqUrl}/LeaveRequest/status`;
    return this.http.put<StatusBody>(url, body);
  }

  deleteRequest(id: number){
    const url = `${this.reqUrl}/LeaveRequest/${id}`;
    return this.http.delete(url);
  }

 //obtenir toutes le requêtes qui sont acceptées
 getAllReqsAccept(){
  return this.http.get<AllReqAccpted[]>(`${this.reqUrl}/AllRequestAccepted`)
  
 }

 //exporter les données en excel
 exportToExcel(){
  return this.http.get('https://localhost:7240/api/ExportToExcel', { observe: 'response', responseType: 'blob'});
 }


  
}
