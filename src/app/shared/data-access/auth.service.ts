import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'isUserLogin';

  private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn$$.pipe(delay(0));

  constructor() {
    const value = localStorage.getItem(this.key) === '1';
    this.isLoggedIn$$.next(value);
  }

  login() {
    localStorage.setItem(this.key, '1');
    this.isLoggedIn$$.next(true);
  }

  logout() {
    localStorage.removeItem(this.key);
    this.isLoggedIn$$.next(false);
  }

  isLoggedIn() {
    return this.isLoggedIn$$.value;
  }
}
