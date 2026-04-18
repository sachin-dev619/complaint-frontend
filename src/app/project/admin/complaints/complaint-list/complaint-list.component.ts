import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/_services/complaint.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

  complaints: any[] = [];
  filteredData: any[] = [];

  status: string = '';
  priority: string = '';
  searchText: string = '';

  loading = false;

  // ✅ pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(
    private service: ComplaintService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  // ✅ GET DATA WITH PAGINATION
  getData(page: number = 1) {
    this.loading = true;

    this.service.getAllComplaints(page).subscribe({
      next: (res: any) => {

        this.complaints = res.data;
        this.filteredData = res.data;

        this.currentPage = res.pagination.current_page;
        this.lastPage = res.pagination.last_page;
        this.total = res.pagination.total;

        this.applyFilter();

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // ✅ FILTER
  applyFilter() {
    this.filteredData = this.complaints.filter((item: any) => {

      const matchStatus = this.status
        ? item.status === this.status
        : true;

      const matchPriority = this.priority
        ? item.priority === this.priority
        : true;

      const matchSearch = this.searchText
        ? item.complaint_text?.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      return matchStatus && matchPriority && matchSearch;
    });
  }

  // ✅ UPDATE STATUS
  updateStatus(c: any) {
    this.service.updateStatus(c.id, {
      status: c.status,
      admin_remark: c.admin_remark
    }).subscribe({
      next: (res: any) => {
        alert(res.message);

        // 🔄 refresh same page
        this.getData(this.currentPage);
      }
    });
  }

  // ✅ VIEW
  viewComplaint(id: number) {
    this.router.navigate(['/admin/complaint-view', id]);
  }

  // ✅ CHANGE PAGE
  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getData(page);
  }

}