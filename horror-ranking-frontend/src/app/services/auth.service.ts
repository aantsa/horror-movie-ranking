import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  validToken: String;
  private authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authStatus$: Observable<boolean> = this.authStatus.asObservable();

  constructor(private router: Router, private connectionService: ConnectionService) {
    if (this.getRefreshToken() !== null) {
      this.updateAuthorizationStatus(true);
    }
  }

  login(email: string, password: string) {
    return this.connectionService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.validToken = res.headers.get('x-access-token');
      })
    )
  }

  signup(email: string, password: string) {
    return this.connectionService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      })
    )
  }

  logout() {
    this.removeSession();
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  updateAuthorizationStatus(authStatus: boolean) {
    this.authStatus.next(authStatus);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
