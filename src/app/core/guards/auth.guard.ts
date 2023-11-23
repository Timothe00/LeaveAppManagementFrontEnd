import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


export const canActivateDashboardGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  } else {
    return inject(Router).navigate(['auth/login']);
  }
};

