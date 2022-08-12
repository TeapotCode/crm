import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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
    login: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
    confirmPassword: new FormControl('', {validators: [Validators.required], nonNullable: true})
  }, {validators: this.checkPasswords})

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
  }

  get login() {
    return this.form.get('login')
  }

  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')
  }
  onSubmit() {
    console.log(this.form.errors)

    if (!this.form.valid) return

    this.auth.login()
    this.router.navigate(['dashboard'])
  }


  checkPasswords(group: AbstractControl):  ValidationErrors | null  {
    let pass = group.get('password')?.value
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

}
