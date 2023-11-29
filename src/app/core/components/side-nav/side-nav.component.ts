import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInTokenService } from '../../services/userInToken/user-in-token.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  role!: string;
  constructor(private userToken: UserInTokenService, private auth: AuthService) {}


  ngOnInit(){
   this.userToken.getUserRoleFromToken()
   .subscribe(value =>{
     const roleFromToken = this.auth.getRoleInToken();
     this.role = value|| roleFromToken
   })
  }

  logOut(){
    this.auth.signOut()
  }
}
