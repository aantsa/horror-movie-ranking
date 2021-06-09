import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Component: Login', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, RouterModule.forRoot([])],
      declarations: [LoginComponent],
      providers: [AuthService],
    });
  });
    it('loggedIn returns false when the user has NOT been authenticated', inject([Router, AuthService], (router: Router, authService: AuthService) => {
      let component = new LoginComponent(authService, router,);
      spyOn(authService, 'login').and.returnValue(of(200) as any);
      expect(component.loggedIn).toBeFalsy();
      }
    ));

    it('loggedIn returns true when the user has been authenticated', inject([Router, AuthService], (router: Router, authService: AuthService) => {
      let component = new LoginComponent(authService, router);
      spyOn(authService, 'login').and.returnValue(of(200) as any);
      expect(component.loggedIn).toBeFalsy();
      }
    ));
});
