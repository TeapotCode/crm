import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/data-access/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  form = this.fb.group(
    {
      login: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    },
    { validators: this.checkPasswords }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  get login() {
    return this.form.controls.login;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.auth.login();
    this.router.navigate(['dashboard']).then();
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  strength$ = this.password.valueChanges.pipe(
    map((value) => {
      const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
      const lowerLetters = /[a-z]+/.test(this.password.value);
      const upperLetters = /[A-Z]+/.test(this.password.value);
      const numbers = /[0-9]+/.test(this.password.value);
      const symbols = regex.test(this.password.value);
      const flags = [lowerLetters, upperLetters, numbers, symbols];
      let passed = 0;

      flags.forEach((val) => (passed += val ? 1 : 0));
      return passed ? (this.password.value.length < 8 ? 1 : passed) : passed;
    })
  );
}
