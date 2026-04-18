import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentSetPasswordComponent } from './student-set-password/student-set-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
     LoginComponent,     // ✅ ADD THIS
    RegisterComponent, 
    StudentSetPasswordComponent, ForgotPasswordComponent   // ✅ ADD THIS (if exists)
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
