import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/data-access/auth.service';
import { InputComponent } from '../../ui/input/input.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],

      declarations: [LoginComponent, InputComponent],
      providers: [FormBuilder, provideMock(Router), provideMock(AuthService)],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('invalid form', () => {
    it('should be invalid', () => {
      component.form.setValue({ login: '', password: '' });
      fixture.detectChanges();

      expect(component.form.valid).toBe(false);
    });

    it('should NOT login', () => {
      component.form.setValue({ login: 'asd', password: 'asd' });
      fixture.detectChanges();

      expect(component.form.valid).toBe(true);

      component.onSubmit();

      expect(component.form.valid).toBe(false);

      expect(component.form.controls.password.value).toBe('');
      expect(component.form.errors).toEqual({ invalidCredentials: true });
    });
  });

  describe('valid form', () => {
    it('should be valid', () => {
      component.form.setValue({ login: 'adrian', password: '12345678' });
      fixture.detectChanges();

      expect(component.form.valid).toBe(true);
    });

    it('should login', () => {
      component.form.setValue({ login: 'adrian', password: '12345678' });
      fixture.detectChanges();

      const authLoginSpy = jest.spyOn(auth, 'login');
      const routerNavigateSpy = jest.spyOn(router, 'navigate');

      component.onSubmit();

      expect(component.form.valid).toBe(true);
      expect(authLoginSpy).toHaveBeenCalled();
      expect(routerNavigateSpy).toHaveBeenCalledWith(['dashboard']);
    });
  });
});
