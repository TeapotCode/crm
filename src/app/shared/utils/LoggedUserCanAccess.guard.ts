import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserCanAccessGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn()) return true;

    return this.router.createUrlTree(['auth', 'login']);
  }
}
