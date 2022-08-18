import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/data-access/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.fb.group({
    login: new FormControl('adrian', Validators.required),
    password: new FormControl('12345678', Validators.required),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  get login() {
    return this.form.controls.login;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    if (this.login.errors || this.password.errors) return;

    if (this.login.value === 'adrian' && this.password.value === '12345678') {
      this.auth.login();
      this.router.navigate(['dashboard']);
    } else {
      this.password.setValue('');
      this.form.setErrors({ invalidCredentials: true });
    }
  }
}
