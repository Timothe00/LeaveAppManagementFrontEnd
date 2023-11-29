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

//  id! : number;
//  user : Users = {
//   email:'',
//   firstName: '',
//   id: 0,
//   isActiveUser: false,
//   job: '',
//   lastName: '',
//   phoneNumber: '',
//   roleId: 0,
//   password: '',
//   roleName: ''
//  }
 constructor(private userToken: UserInTokenService, private auth: AuthService) {}


 ngOnInit(){
  this.userToken.getUserFromToken()
  .subscribe(data=>{
    let fullNameFromToken = this.auth.getfullNameInToken();
    this.fullName = data || fullNameFromToken 
  })
 }


}
