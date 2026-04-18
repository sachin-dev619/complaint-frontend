import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/_services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  user: any = null;
  loading = false;
  errorMsg = '';

  constructor(
    private userService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  // ✅ FIXED API HANDLING
  getProfile() {
    this.loading = true;

    this.userService.getProfile().subscribe({
      next: (res: any) => {

        // 🔥 FIX: handle both API formats
        this.user = res.data ?? res;

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  // ✅ Edit Profile
  editProfile() {
    this.router.navigate(['/student/edit-profile']);
  }
}