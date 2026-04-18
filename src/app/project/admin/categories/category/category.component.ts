import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];

  name = '';
  error: any = {};
  successMsg = '';
  errorMsg = '';

  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(page: number = 1) {
    this.service.getCategories(page).subscribe((res: any) => {
      this.categories = res.data;
      this.currentPage = res.pagination.current_page;
      this.lastPage = res.pagination.last_page;
      this.total = res.pagination.total;
    });
  }

  addCategory() {
    this.error = {};
    if (!this.name.trim()) {
      this.error = { name: ['Category required'] };
      return;
    }

    this.service.addCategory({ name: this.name }).subscribe({
      next: () => {
        this.name = '';
        this.getCategories(this.currentPage);
      },
      error: (err) => {
        this.error = err.error.errors;
      }
    });
  }

  deleteCategory(id: number) {
    if (!confirm('Delete this category?')) return;

    this.service.deleteCategory(id).subscribe(() => {
      this.getCategories(this.currentPage);
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getCategories(page);
  }
}