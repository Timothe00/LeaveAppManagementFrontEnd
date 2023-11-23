import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  //on lier le token au Header
  //nous devons ajouter le token sur l'en-tête
  constructor(private auth: AuthService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //on recupère le token depuis AuthService
    const myToken = this.auth.getToken();

    //on verifie si le token existe
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }
    //on renvoi la modification au backend
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500
            });
            Toast.fire({
              icon: "error",
              title: "Impossible d'acceder à cette ressource"
            });

            this.route.navigate(['auth/login'])
          }
        }
        return throwError(()=> new Error("une autre erreur s'est produite"))
      })
    )
  }
}

//après la configuration ci-dessus appModule