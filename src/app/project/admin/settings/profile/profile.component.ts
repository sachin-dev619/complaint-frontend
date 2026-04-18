import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  loading = false;

  constructor(private service: AdminService) {}

  ngOnInit() {
    this.getProfile();
  }

  // ✅ GET PROFILE
  getProfile() {
    this.service.getProfile().subscribe((res: any) => {
      this.profile = res.data;
    });
  }

  // ✅ UPDATE PROFILE
  updateProfile() {
    this.loading = true;

    this.service.updateProfile(this.profile).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}