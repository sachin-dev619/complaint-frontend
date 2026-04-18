import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: any[] = [];

  // ✅ pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(page: number = 1) {
    this.adminService.getStudents(page).subscribe((res: any) => {

      this.students = res.data;

      this.currentPage = res.pagination.current_page;
      this.lastPage = res.pagination.last_page;
      this.total = res.pagination.total;

    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getStudents(page);
  }

}