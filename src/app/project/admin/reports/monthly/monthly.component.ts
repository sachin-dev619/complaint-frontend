import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {

  selectedMonth: string = '';
  complaints: any[] = [];

  // ✅ pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    const today = new Date();
    this.selectedMonth = today.toISOString().slice(0, 7);
    this.getMonthlyData();
  }

  // ✅ GET DATA WITH PAGE
  getMonthlyData(page: number = 1) {
    this.service.getMonthlyReport(this.selectedMonth, page).subscribe((res: any) => {

      this.complaints = res.data;

      // ✅ IMPORTANT (from API)
      this.currentPage = res.pagination.current_page;
      this.lastPage = res.pagination.last_page;
      this.total = res.pagination.total;
    });
  }

  onMonthChange() {
    this.getMonthlyData(1);
  }

  // ✅ CHANGE PAGE
  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getMonthlyData(page);
  }
}