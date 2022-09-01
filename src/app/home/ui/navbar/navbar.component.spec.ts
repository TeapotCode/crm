import { NavbarComponent } from './navbar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideMock,
  provideMockWithValues,
} from '@testing-library/angular/jest-utils';
import { screen } from '@testing-library/angular';
import { AuthService } from '../../../shared/data-access/auth.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [provideMock(AuthService)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should show dashboard if logged in', () => {
    component.isLoggedIn$ = of(true);

    fixture.detectChanges();

    const dashboardRef = screen.queryByText(/Dashboard/i);
    expect(dashboardRef).toBeTruthy();
  });

  it('should hide dashboard if logged out', () => {
    component.isLoggedIn$ = of(false);

    fixture.detectChanges();

    const dashboardRef = screen.queryByText(/Dashboard/i);
    expect(dashboardRef).toBeNull();
  });
});
