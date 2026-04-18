import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.scss']
})
export class ComplaintViewComponent implements OnInit {

  complaint: any;

  constructor(
    private route: ActivatedRoute,
    private service: AdminService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getComplaint(id);
  }

  // ✅ GET SINGLE COMPLAINT
  getComplaint(id: any) {
    this.service.getComplaintById(id).subscribe((res: any) => {
      this.complaint = res.data;
    });
  }

  // ✅ UPDATE STATUS + REMARK
  updateStatus() {
    this.service.updateStatus(this.complaint.id, {
      status: this.complaint.status,
      admin_remark: this.complaint.admin_remark
    }).subscribe((res: any) => {
      alert(res.message); // "Complaint updated successfully"
    });
  }
}