import { TestBed } from '@angular/core/testing';
import {
  provideMock,
  provideMockWithValues,
} from '@testing-library/angular/jest-utils';
import { AuthService } from '../data-access/auth.service';
import { AuthGuard } from './auth-guard.guard';
import { Router, RouterModule } from '@angular/router';
describe('AuthGuard', () => {
  let authMock: AuthService;
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMock(AuthService), AuthGuard, provideMock(Router)],
      imports: [RouterModule.forRoot([])],
    });

    authMock = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });
  describe('OnLoad', () => {
    it('should return false if user is logged in', () => {
      const authSpy = jest.spyOn(authMock, 'isLoggedIn').mockReturnValue(true);

      const result = guard.canLoad();

      expect(authSpy).toBeCalled();
      expect(result).toBe(true);
    });

    it('should redirect if user is not logged in', () => {
      const authSpy = jest.spyOn(authMock, 'isLoggedIn').mockReturnValue(false);
      let redirectSpy = jest.spyOn(router, 'createUrlTree');

      guard.canLoad();

      expect(authSpy).toBeCalled();

      expect(redirectSpy).toHaveBeenNthCalledWith(1, ['auth', 'login']);
    });
  });
});
