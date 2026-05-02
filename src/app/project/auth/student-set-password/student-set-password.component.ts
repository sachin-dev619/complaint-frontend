import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-student-set-password',
  templateUrl: './student-set-password.component.html',
  styleUrls: ['../shared-auth-layout.scss']
})
export class StudentSetPasswordComponent {
 data = {
    email: '',
    password: '',
    confirm_password: ''
  };

  error: string = '';
  success: string = '';
  loading: boolean = false; // ✅ loader
  showPassword: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  setPassword() {

    // 🔴 Password match check
    if (this.data.password !== this.data.confirm_password) {
      this.error = "Passwords do not match";
      return;
    }

    this.error = '';
    this.loading = true; // 🔥 start loader

    this.auth.studentRegister(this.data).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.loading = false;

        // clear form
        this.data = { email: '', password: '', confirm_password: '' };

        // redirect
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong';
        this.success = '';
        this.loading = false; // 🔥 stop loader
      }
    });
  }
}
