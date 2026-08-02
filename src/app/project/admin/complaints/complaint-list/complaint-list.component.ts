import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplaintService } from 'src/app/_services/complaint.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

  complaints: any[] = [];

  status: string = '';
  priority: string = '';
  searchText: string = '';

  loading = false;
  savingId: number | null = null;

  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;

  private searchTimer: any;

  constructor(
    private service: ComplaintService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(page: number = 1) {
    this.loading = true;

    this.service.getAllComplaints(page, {
      status: this.status,
      priority: this.priority,
      search: this.searchText.trim()
    }).subscribe({
      next: (res: any) => {
        this.complaints = res.data || [];
        this.currentPage = res.pagination?.current_page || 1;
        this.lastPage = res.pagination?.last_page || 1;
        this.total = res.pagination?.total || 0;
        this.perPage = res.pagination?.per_page || 10;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Failed to load complaints');
      }
    });
  }

  onFilterChange() {
    this.getData(1);
  }

  onSearchInput() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.getData(1), 350);
  }

  updateStatus(c: any) {
    this.savingId = c.id;

    this.service.updateStatus(c.id, {
      status: c.status,
      admin_remark: c.admin_remark
    }).subscribe({
      next: (res: any) => {
        this.savingId = null;
        this.toastr.success(res.message || 'Status updated');
        this.getData(this.currentPage);
      },
      error: () => {
        this.savingId = null;
        this.toastr.error('Failed to update status');
      }
    });
  }

  viewComplaint(id: number) {
    this.router.navigate(['/admin/complaint-view', id]);
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getData(page);
  }

  get showingFrom(): number {
    if (this.total === 0) return 0;
    return (this.currentPage - 1) * this.perPage + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.perPage, this.total);
  }
}
