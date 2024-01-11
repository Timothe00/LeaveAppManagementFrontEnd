import { Component } from '@angular/core';
import { Reporting, ReportingByUser } from 'src/app/core/models/reporting.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent {
 fullName!: string;
 role!: string;
 user!: Users;
 userId!: number;
 stats!: Reporting[];
 statByUser!: Reporting; 

 isHidden!: true;

 //pour tous les utilisateurs
 totalRequest: number = 0;
 totalPending: number = 0;
 totalApproved: number = 0;
 totalRejected: number = 0;


 //pour un seul utilisateur
 totalRequestUser: number = 0;
 totalPendingUser: number = 0;
 totalApprovedUser: number = 0;
 totalRejectedUser: number = 0;

 constructor(private userToken: UserInTokenService, 
  private auth: AuthService,
  private apiUser: ApiService,
  private token: UserInTokenService,
  private api: ApiService) {}


 ngOnInit(){

  const userToken = this.token.getInfoUserToken()
  this.userId = +userToken.primarysid


  this.getAllLeaveReports();
  this.getLeaveReportsByUser();

  this.getUserById(+userToken.primarysid)
  
  this.userToken.getUserFromToken()
  .subscribe(data=>{
    let fullNameFromToken = this.auth.getfullNameInToken();
    this.fullName = data || fullNameFromToken 
    
  })
  this.userToken.getUserRoleFromToken()
  .subscribe(value =>{
    const roleFromToken = this.auth.getRoleInToken();
    this.role = value || roleFromToken
  })

  // if (userToken.role === 'Employee') {
  //   this.isHidden
  // }

 }



 isEmployee(role: string): boolean{
  return role ==='Employee'
 }



 getAllLeaveReports(): void {
  const userToken = this.token.getInfoUserToken()
  const userRole = userToken.role

  if(userRole ==='Manager'||userRole ==='Admin'){
    this.api.getStatisticOfAllUser('Manager'||'Admin').subscribe((res: Reporting[]) => {
      this.stats = res;
      if (Array.isArray(res)) {
        this.totalRequest = res.reduce((sum, report) => sum + report.totalRequest, 0);
        this.totalPending = res.reduce((sum, report) => sum + report.totalApproved, 0);
        this.totalApproved = res.reduce((sum, report) => sum + report.totalPending, 0);
        this.totalRejected = res.reduce((sum, report) => sum + report.totalRejected, 0);
      } else {
        const report = res as Reporting;
        this.totalRequest = report.totalRequest;
        this.totalPending = report.totalPending;
        this.totalApproved = report.totalApproved;
        this.totalRejected = report.totalRejected;
      }
      
    })
  }

}

getLeaveReportsByUser(): void {
  const userToken = this.token.getInfoUserToken()
  this.api.getStatisticByUser(+userToken.primarysid).subscribe((res: ReportingByUser) => {
    this.statByUser = res;
    if (Array.isArray(res)) {
      this.totalRequestUser = res.reduce((sum, report) => sum + report.totalRequestUser, 0);
      this.totalPendingUser = res.reduce((sum, report) => sum + report.totalApprovedUser, 0);
      this.totalApprovedUser = res.reduce((sum, report) => sum + report.totalPendingUser, 0);
      this.totalRejectedUser = res.reduce((sum, report) => sum + report.totalRejectedUser, 0);
    } else {
      const report = res as ReportingByUser;
      this.totalRequestUser = report.totalRequest;
      this.totalPendingUser = report.totalPending;
      this.totalApprovedUser = report.totalApproved;
      this.totalRejectedUser = report.totalRejected;
    }
    
  })
}

getUserById(id: number) {
  this.apiUser.getUserByIdIntable(id)
    .subscribe(
      {
        next: (user: any) => {
          this.user = user
        },
        error: (err: any) => {
          console.log(err);
        }
      })
}

}
