import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // 👨‍🎓 STUDENTS
  // =========================

  getStudents(page: number = 1) {
    return this.http.get(
      `${this.API_URL}/students?page=${page}&per_page=10`
    );
  }

  addStudent(data: any) {
    return this.http.post(
      `${this.API_URL}/students`,
      data
    );
  }

  // =========================
  // 📂 CATEGORY
  // =========================

  getCategories(page: number = 1) {
    return this.http.get(
      `${this.API_URL}/categories?page=${page}&per_page=10`
    );
  }

  addCategory(data: any) {
    return this.http.post(
      `${this.API_URL}/categories`,
      data
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(
      `${this.API_URL}/categories/${id}`
    );
  }

  // =========================
  // 📁 SUBCATEGORY
  // =========================

  getSubcategories(page: number = 1) {
    return this.http.get(
      `${this.API_URL}/subcategories?page=${page}&per_page=10`
    );
  }

  addSubcategory(data: any) {
    return this.http.post(
      `${this.API_URL}/subcategories`,
      data
    );
  }

  deleteSubcategory(id: number) {
    return this.http.delete(
      `${this.API_URL}/subcategories/${id}`
    );
  }

  // =========================
  // 📊 REPORTS
  // =========================

  getDailyReport(date: string, page: number = 1) {
    return this.http.get(
      `${this.API_URL}/reports/daily?date=${date}&page=${page}&per_page=10`
    );
  }

  getMonthlyReport(month: string, page: number = 1) {
    return this.http.get(
      `${this.API_URL}/reports/monthly?month=${month}&page=${page}&per_page=10`
    );
  }

  // =========================
  // 📝 COMPLAINT
  // =========================

  updateStatus(id: number, data: any) {
    return this.http.post(
      `${this.API_URL}/update-status/${id}`,
      data
    );
  }

  getComplaintById(id: number) {
    return this.http.get(
      `${this.API_URL}/admin/complaints/${id}`
    );
  }

  // =========================
  // 👤 PROFILE
  // =========================

  getProfile() {
    return this.http.get(
      `${this.API_URL}/profile`
    );
  }

  updateProfile(data: any) {
    return this.http.post(
      `${this.API_URL}/profile-update`,
      data
    );
  }

  // =========================
  // 🔒 CHANGE PASSWORD
  // =========================

  changePassword(data: any) {
    return this.http.post(
      `${this.API_URL}/change-password`,
      data
    );
  }
}