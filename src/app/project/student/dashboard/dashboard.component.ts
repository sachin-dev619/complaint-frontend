import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ComplaintService } from 'src/app/_services/complaint.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   // 🔹 Cards Data
  total = 0;
  pending = 0;
  resolved = 0;
  inprogress = 0;

  chartLabels: string[] = ['Pending', 'In Progress', 'Resolved'];
  chartData: number[] = [0, 0, 0];

  complaints: any[] = [];

  constructor(private complaint: ComplaintService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.complaint.getMyComplaints().subscribe((res: any) => {

      this.complaints = res;

      // 🔹 Count logic
      this.total = this.complaints.length;
      this.pending = this.complaints.filter(c => c.status === 'Pending').length;
      this.resolved = this.complaints.filter(c => c.status === 'Resolved').length;
      this.inprogress = this.complaints.filter(c => c.status === 'In Progress').length;

      // 🔹 Chart
      this.chartData = [this.pending, this.inprogress, this.resolved];

    }, (err) => {
      console.error(err);
    });
  }
}
