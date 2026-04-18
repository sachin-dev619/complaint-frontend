import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/_services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.scss']
})
export class MyComplaintsComponent implements OnInit {

  complaints: any[] = [];
  loading = false;

  constructor(
    private complaintService: ComplaintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getComplaints();
  }

  getComplaints() {
    this.loading = true;

    this.complaintService.getMyComplaints().subscribe({
      next: (res: any) => {
        this.complaints = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 👁 View page
  viewComplaint(id: number) {
    this.router.navigate(['/student/complaint-view', id]);
  }

  // ✏ Edit page
  editComplaint(id: number) {
    this.router.navigate(['/student/edit-complaint', id]);
  }
}