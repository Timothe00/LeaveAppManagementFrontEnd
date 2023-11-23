import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateDashboardGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:"auth/login", pathMatch: 'full'},

  { 
    path: 'auth', 
    loadChildren: () => 
    import('./feature/authentification/authentification.module')
    .then(m => m.AuthentificationModule) 
  },

  { path: 'dashboard', 
  loadChildren: () => 
  import('./feature/dashboard/dashboard.module')
  .then(m => m.DashboardModule), canActivate: [canActivateDashboardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
