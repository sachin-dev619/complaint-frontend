import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  categories: any[] = [];
  subcategories: any[] = [];

  category_id = '';
  name = '';

  currentPage = 1;
  lastPage = 1;
  total = 0;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getSubcategories();
  }

  getCategories() {
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  getSubcategories(page: number = 1) {
    this.service.getSubcategories(page).subscribe((res: any) => {
      this.subcategories = res.data;
      this.currentPage = res.pagination.current_page;
      this.lastPage = res.pagination.last_page;
      this.total = res.pagination.total;
    });
  }

  addSubcategory() {
    if (!this.category_id || !this.name.trim()) return;

    this.service.addSubcategory({
      category_id: this.category_id,
      name: this.name
    }).subscribe(() => {
      this.name = '';
      this.category_id = '';
      this.getSubcategories(this.currentPage);
    });
  }

  deleteSubcategory(id: number) {
    if (!confirm('Delete?')) return;

    this.service.deleteSubcategory(id).subscribe(() => {
      this.getSubcategories(this.currentPage);
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.getSubcategories(page);
  }
}