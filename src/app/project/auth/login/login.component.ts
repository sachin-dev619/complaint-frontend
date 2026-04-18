import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.data).subscribe({
      next: (res: any) => {

        // ✅ Save token
        localStorage.setItem('token', res.token);

        // ✅ Save user
        localStorage.setItem('user', JSON.stringify(res.user));

        // ✅ Redirect
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/student/dashboard']);
        }

      },
      error: () => {
        alert('Invalid login');
      }
    });
  }
}
