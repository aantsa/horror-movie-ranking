import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    //Checking if there is access token for the user
    if (this.authService.getAccessToken()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    //User status changed according to authStatus
    this.userSub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = !!status;
    })

  }

  onLogOut() {
    this.authService.logout();
    //this.router.navigateByUrl('/');
    location.reload();
    this.authService.updateAuthorizationStatus(false);
  }

}
