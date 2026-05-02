import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../shared-auth-layout.scss']
})
export class ForgotPasswordComponent {
   email: string = '';
  message: string = '';
  error: string = '';

  constructor(private auth: AuthService) {}

  forgotPassword() {
    this.auth.forgotPassword({ email: this.email }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.error = '';
      },
      error: () => {
        this.error = 'Email not found';
        this.message = '';
      }
    });
  }
}
