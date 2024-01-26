import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportingBalance } from 'src/app/core/models/reportingBalance.model';
import { Role } from 'src/app/core/models/role.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  fullName!: string;
  roles!: Role[];
 
  
  report!:ReportingBalance; 
  userReport!:ReportingBalance;

  employeeId!: number
  employeeName!: string
  totaLeaveAvailable!: number
  totalLeaveUsed!: number
  totalCurrentLeave!: number

  constructor(
    private userToken: UserInTokenService, 
    private auth: AuthService, 
    private api: ApiService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(){

      const userToken = this.userToken.getInfoUserToken();
      this.getUserById(+userToken.primarysid)
      this.userToken.getUserFromToken()
      .subscribe(data=>{
        let fullNameFromToken = this.auth.getfullNameInToken();
        this.fullName = data || fullNameFromToken  
      })
    
      this.api.getRole().pipe().subscribe((res: Role[]) => {
        this.roles = res
      })

      this.getLeaveReportsByUser();
    }


    //obtenir un utilisateur par son Id
    getUserById(userId: number): void {
      this.api.getUserByIdIntable(userId).subscribe({
        next: (val: any) => {
          console.log(val);
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'accès à l\'utilisateur', err);
        }
      });
    }


    getLeaveReportsByUser(): void {
      const userToken = this.userToken.getInfoUserToken();
      this.api.getReportingBalance(+userToken.primarysid).subscribe((res: ReportingBalance) => {
        this.userReport = res;
        console.log("rapport", res);
        
        if (Array.isArray(res)) {
          this.employeeId = res.reduce((sum, report) => sum + report.employeeId, 0);
          this.employeeName = res.reduce((sum, report) => sum + report.employeeName, 0);
          this.totaLeaveAvailable = res.reduce((sum, report) => sum + report.totaLeaveAvailable, 0);
          this.totalLeaveUsed = res.reduce((sum, report) => sum + report.totalLeaveUsed, 0);
          this.totalCurrentLeave = res.reduce((sum, report) => sum + report.totalCurrentLeave, 0);
        } else {
          const report = res as ReportingBalance;
          this.employeeId = report.employeeId;
          this.employeeName = report.employeeName;
          this.totaLeaveAvailable = report.totaLeaveAvailable;
          this.totalLeaveUsed = report.totalLeaveUsed;
          this.totalCurrentLeave = report.totalCurrentLeave;
        }
        
      })
    }
}
