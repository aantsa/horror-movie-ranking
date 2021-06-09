import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  loggedIn: boolean = false;
  wrongCredentials = false;
  sameEmail = false;
  userCreated = false;
  @ViewChild('emailInput') inputEmail;
  @ViewChild('passwordInput') inputPassword;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.userCreated = false;
    this.sameEmail = false;
  }

  onLogin(email: string, password: string) {
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
        if (res.body.status = 200) {
          this.loggedIn = true;
          this.router.navigateByUrl('/');
          this.authService.updateAuthorizationStatus(true);
          this.wrongCredentials = false;
        }
      }, error => {
        this.wrongCredentials = true;
      });
    } else {
      this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
        if (res.body.status = 200) {
          this.inputEmail = '';
          this.inputPassword = '';
          this.sameEmail = false;
          this.userCreated = true;
        }
      }, error => {
        this.inputEmail.nativeElement.value = '';
        this.inputPassword.nativeElement.value = '';
        this.sameEmail = true;
      });
    }
  }
}
