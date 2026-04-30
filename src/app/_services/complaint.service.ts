import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveApiUrl } from 'src/app/_helpers/runtime-config';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  API_URL = resolveApiUrl();

  constructor(private http: HttpClient) {}

  // =========================
  // 📝 STUDENT COMPLAINT
  // =========================

  // ✅ Add Complaint
  addComplaint(data: any) {
    return this.http.post(`${this.API_URL}/complaints`, data);
  }

  // ✅ Get My Complaints
  getMyComplaints() {
    return this.http.get(`${this.API_URL}/my-complaints`);
  }

  // ✅ Get Single Complaint
  getComplaintById(id: number) {
    return this.http.get(`${this.API_URL}/complaints/${id}`);
  }

  // =========================
  // 🛠️ ADMIN COMPLAINT
  // =========================

  // ✅ Get All Complaints (Pagination)
  getAllComplaints(page: number = 1) {
    return this.http.get<any>(
      `${this.API_URL}/all-complaints?page=${page}&per_page=10`
    );
  }

  // ✅ Update Status
  updateStatus(id: number, data: any) {
    return this.http.post(`${this.API_URL}/update-status/${id}`, data);
  }

  // =========================
  // 📂 CATEGORY / SUBCATEGORY
  // =========================

  getCategories() {
    return this.http.get(`${this.API_URL}/categories`);
  }

  getSubcategoriesByCategory(id: number) {
    return this.http.get(`${this.API_URL}/subcategories/${id}`);
  }

  // =========================
  // ✏️ UPDATE COMPLAINT
  // =========================

  updateComplaint(id: number, formData: FormData) {
    formData.append('_method', 'PUT'); // Laravel PUT workaround

    return this.http.post(
      `${this.API_URL}/complaints/${id}`,
      formData
    );
  }
}