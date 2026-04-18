import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {

  selectedDate: string = '';
  complaints: any[] = [];

  // ✅ pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.getDailyData();
  }

  getDailyData(page: number = 1) {
    this.service.getDailyReport(this.selectedDate, page).subscribe((res: any) => {

      this.complaints = res.data;

      this.currentPage = res.pagination.current_page;
      this.lastPage = res.pagination.last_page;
      this.total = res.pagination.total;
    });
  }

  onDateChange() {
    this.getDailyData(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getDailyData(page);
  }
}