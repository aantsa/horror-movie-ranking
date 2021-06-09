import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthHeader(req);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    )
  }

  addAuthHeader(req: HttpRequest<any>){
    const token = this.authService.getAccessToken();

    if(token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return req;
  }
}
