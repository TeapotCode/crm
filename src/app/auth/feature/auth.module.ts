import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InputComponent } from '../ui/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthComponent } from '../ui/password-strength/password-strength.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    InputComponent,
    PasswordStrengthComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
