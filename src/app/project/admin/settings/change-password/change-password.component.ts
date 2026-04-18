import { Component } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  form: any = {
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private service: AdminService) {}

  changePassword() {

    // ✅ Check confirm password
    if (this.form.new_password !== this.form.new_password_confirmation) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.service.changePassword(this.form).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;

        // ✅ Reset form
        this.form = {
          old_password: '',
          new_password: '',
          new_password_confirmation: ''
        };

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.loading = false;
      }
    });
  }
}