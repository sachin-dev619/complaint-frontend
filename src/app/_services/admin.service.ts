import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://127.0.0.1:8000/api'; // Laravel API

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  // ✅ Get all students (with pagination)
  getStudents(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/students?page=${page}&per_page=10`,
      this.getHeaders()
    );
  }

  // ✅ Add student
  addStudent(data: any) {
    return this.http.post(this.apiUrl + '/students', data, this.getHeaders());
  }

  // ✅ Category
  getCategories(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/categories?page=${page}&per_page=10`
    );
  }


addCategory(data: any) {
  return this.http.post('http://localhost:8000/api/categories', data);
}

  // ✅ Subcategory
  getSubcategories(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/subcategories?page=${page}&per_page=10`
    );
  }

  addSubcategory(data: any) {
    return this.http.post('http://localhost:8000/api/subcategories', data);
  }

  // Category delete
  deleteCategory(id: number) {
    return this.http.delete(`http://localhost:8000/api/categories/${id}`);
  }

  // Subcategory delete
  deleteSubcategory(id: number) {
    return this.http.delete(`http://localhost:8000/api/subcategories/${id}`);
  }

  // Daily report
  getDailyReport(date: string, page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/reports/daily?date=${date}&page=${page}&per_page=10`
    );
  }

  getMonthlyReport(month: string, page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/reports/monthly?month=${month}&page=${page}&per_page=10`
    );
  }

  // complaint.service.ts

  updateStatus(id: number, data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/update-status/${id}`, data);
  }

  getComplaintById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/api/admin/complaints/${id}`);
  }

  // =========================
// 👤 PROFILE
  // =========================

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`, this.getHeaders());
  }

  updateProfile(data: any) {
    return this.http.post(`${this.apiUrl}/profile-update`, data, this.getHeaders());
  }

  // =========================
  // 🔒 CHANGE PASSWORD
  // =========================

  changePassword(data: any) {
    return this.http.post(`${this.apiUrl}/change-password`, data, this.getHeaders());
  }
}
