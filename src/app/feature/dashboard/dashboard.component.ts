import { Component } from '@angular/core';
import { Users } from 'src/app/core/models/users';
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
 constructor(private userToken: UserInTokenService, private auth: AuthService) {}


 ngOnInit(){
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


}
