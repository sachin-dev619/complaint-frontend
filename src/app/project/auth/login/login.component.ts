import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  data: any = {
    email: '',
    password: ''
  };

  isSubmitting = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.errorMessage = '';

    if (!this.data.email?.trim() || !this.data.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.isSubmitting = true;

    this.auth.login(this.data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.toastr.success('Signed in successfully');
        this.isSubmitting = false;

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/student/dashboard']);
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage =
          err?.error?.message || 'Invalid email or password.';
        this.toastr.error(this.errorMessage);
      }
    });
  }
}
