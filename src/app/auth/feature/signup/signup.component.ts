import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormControl, NonNullableFormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/data-access/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

  form = this.fb.group({
    login: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: this.checkPasswords})

  constructor(private fb: NonNullableFormBuilder, private router: Router, private auth: AuthService) {
  }

  get login() {
    return this.form.controls.login
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }
  get confirmPassword() {
    return this.form.controls.confirmPassword
  }
  onSubmit() {
    if (!this.form.valid) return

    this.auth.login()
    this.router.navigate(['dashboard']).then()
  }


  checkPasswords(group: AbstractControl):  ValidationErrors | null  {
    let pass = group.get('password')?.value
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

}
