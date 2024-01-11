import { Component } from '@angular/core';
import { Reporting } from 'src/app/core/models/reporting.model';
import { Users } from 'src/app/core/models/users';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

 fullName!: string;
 role!: string;

 stats!: Reporting[];
 totalRequest: number = 0;
 totalPending: number = 0;
 totalApproved: number = 0;
 totalRejected: number = 0;


 constructor(private userToken: UserInTokenService, 
  private auth: AuthService,
  private api: ApiService) {}


 ngOnInit(){

  this.getAllLeaveReports();
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


 }


 getAllLeaveReports(): void {
  this.api.getStatisticOfAllUser('Manager').subscribe((res: Reporting[]) => {
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
