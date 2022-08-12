import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/data-access/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  form = this.fb.group({
    login: new FormControl('adrian', {validators: [Validators.required], nonNullable: true}),
    password: new FormControl('123', {validators: [Validators.required], nonNullable: true})
  })

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
  }

  onSubmit() {
    if (this.form.get('login')?.errors || this.form.get('password')?.errors) return

    this.auth.login()
    this.router.navigate(['homepage'])
  }

}
