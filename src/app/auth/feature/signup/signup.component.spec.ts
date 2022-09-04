import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideMock } from '@testing-library/angular/jest-utils';
import { AuthService } from '../../../shared/data-access/auth.service';
import { InputComponent } from '../../ui/input/input.component';
import { SignupComponent } from './signup.component';
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent, InputComponent],
      providers: [provideMock(Router), provideMock(AuthService), FormBuilder],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  describe('Form', () => {
    it('login required', () => {
      const control = component.form.controls.login;
      control.setValue('admin');

      fixture.detectChanges();

      expect(control.hasError('required')).toBe(false);

      control.setValue('');

      fixture.detectChanges();

      expect(control.hasError('required')).toBe(true);
    });

    it('email require ', () => {
      const control = component.form.controls.email;
      control.setValue('email');

      fixture.detectChanges();

      expect(control.hasError('required')).toBe(false);

      control.setValue('');

      fixture.detectChanges();

      expect(control.hasError('required')).toBe(true);
    });

    it('email valid email', () => {
      const control = component.form.controls.email;
      control.setValue('email@email.com');

      fixture.detectChanges();

      expect(control.hasError('email')).toBe(false);

      control.setValue('email');

      fixture.detectChanges();

      expect(control.hasError('email')).toBe(true);
    });

    it('password require', () => {
      const control = component.form.controls.password;
      control.setValue('short');

      fixture.detectChanges();
      expect(control.hasError('required')).toBe(false);

      control.setValue('');

      fixture.detectChanges();
      expect(control.hasError('required')).toBe(true);
    });

    it('password minlength', () => {
      const control = component.form.controls.password;
      control.setValue('over8password');

      fixture.detectChanges();
      expect(control.hasError('minlength')).toBe(false);

      control.setValue('short');

      fixture.detectChanges();
      expect(control.hasError('minlength')).toBe(true);
    });

    test.each([
      { password: '', strength: 0 },
      { password: 'pass', strength: 1 },
      { password: 'password123', strength: 2 },
      { password: 'PaSSwoRd123', strength: 3 },
      { password: 'PaSSwoRd123!', strength: 4 },
    ])(
      'password $password should have strength equal $strength',
      ({ password, strength }, done: any) => {
        component.strength$.subscribe((value) => {
          expect(value).toBe(strength);
          done();
        });

        component.form.controls.password.setValue(password);

        fixture.detectChanges();
      }
    );
  });
});
