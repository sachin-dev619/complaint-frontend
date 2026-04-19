import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://127.0.0.1:8000/api'; // Laravel API base URL

  constructor(private http: HttpClient) {}

  // ✅ Common Headers (Auth)
  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  // =========================
  // 👨‍🎓 STUDENTS
  // =========================

  getStudents(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/students?page=${page}&per_page=10`,
      this.getHeaders()
    );
  }

  addStudent(data: any) {
    return this.http.post(
      `${this.apiUrl}/students`,
      data,
      this.getHeaders()
    );
  }

  // =========================
  // 📂 CATEGORY
  // =========================

  getCategories(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/categories?page=${page}&per_page=10`
    );
  }

  addCategory(data: any) {
    return this.http.post(
      `${this.apiUrl}/categories`,
      data
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(
      `${this.apiUrl}/categories/${id}`
    );
  }

  // =========================
  // 📁 SUBCATEGORY
  // =========================

  getSubcategories(page: number = 1) {
    return this.http.get(
      `${this.apiUrl}/subcategories?page=${page}&per_page=10`
    );
  }

  addSubcategory(data: any) {
    return this.http.post(
      `${this.apiUrl}/subcategories`,
      data
    );
  }

  deleteSubcategory(id: number) {
    return this.http.delete(
      `${this.apiUrl}/subcategories/${id}`
    );
  }

  // =========================
  // 📊 REPORTS
  // =========================

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

  // =========================
  // 📝 COMPLAINT
  // =========================

  updateStatus(id: number, data: any) {
    return this.http.post(
      `${this.apiUrl}/update-status/${id}`,
      data
    );
  }

  getComplaintById(id: number) {
    return this.http.get(
      `${this.apiUrl}/admin/complaints/${id}`
    );
  }

  // =========================
  // 👤 PROFILE
  // =========================

  getProfile() {
    return this.http.get(
      `${this.apiUrl}/profile`,
      this.getHeaders()
    );
  }

  updateProfile(data: any) {
    return this.http.post(
      `${this.apiUrl}/profile-update`,
      data,
      this.getHeaders()
    );
  }

  // =========================
  // 🔒 CHANGE PASSWORD
  // =========================

  changePassword(data: any) {
    return this.http.post(
      `${this.apiUrl}/change-password`,
      data,
      this.getHeaders()
    );
  }
}