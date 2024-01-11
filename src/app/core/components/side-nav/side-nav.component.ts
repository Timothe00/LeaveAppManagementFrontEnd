import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInTokenService } from '../../services/userInToken/user-in-token.service';
import { ApiService } from '../../services/api/api.service';
import { Reporting } from '../../models/reporting.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  role!: string;
  Active!: string;

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
   this.userToken.getUserRoleFromToken()
   .subscribe(value =>{
     const roleFromToken = this.auth.getRoleInToken();
     this.role = value|| roleFromToken
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



  logOut(){
    this.auth.signOut()
  }



}
