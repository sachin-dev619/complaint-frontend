import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from 'src/app/_services/complaint.service';
import { storageUrl } from 'src/app/_helpers/storage-url';

@Component({
  selector: 'app-student-complaint-view',
  templateUrl: './student-complaint-view.component.html',
  styleUrls: ['./student-complaint-view.component.scss']
})
export class StudentComplaintViewComponent implements OnInit {

  complaint: any;
  loading = false;

  readonly storageUrl = storageUrl;

  constructor(
    private route: ActivatedRoute,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getComplaint(Number(id)); // ✅ FIX HERE
    }
  }

getComplaint(id: number) {
  this.loading = true;

  this.complaintService.getComplaintById(id).subscribe({
    next: (res: any) => {

      console.log('API RESPONSE:', res); // 👈 DEBUG IMPORTANT

      this.complaint = res.data; // ✅ FIX HERE

      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}
}