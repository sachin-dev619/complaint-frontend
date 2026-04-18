import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

   API_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // ✅ Add Complaint (Student)
  addComplaint(data: any) {
    return this.http.post(`${this.API_URL}/complaints`, data);
  }

  // ✅ Get My Complaints (Student)
  getMyComplaints() {
    return this.http.get(`${this.API_URL}/my-complaints`);
  }

  // ✅ Get Single Complaint
  getComplaintById(id: number) {
    return this.http.get(`${this.API_URL}/complaints/${id}`);
  }

  // ✅ Admin: Get All Complaints

  getAllComplaints(page: number = 1) {
    return this.http.get<any>(
      `${this.API_URL}/all-complaints?page=${page}&per_page=10`
    );
  }

  // ✅ Admin: Update Status
  updateStatus(id: number, data: any) {
    return this.http.post(`${this.API_URL}/update-status/${id}`, data);
  }

  getCategories() {
    return this.http.get(`${this.API_URL}/categories`);
  }

  // ✅ Subcategory by category
  getSubcategoriesByCategory(id: number) {
    return this.http.get(`${this.API_URL}/subcategories/${id}`);
  }

  // updateComplaint(id: number, data: any) {
  //   return this.http.put(`${this.API_URL}/complaints/${id}`, data);
  // }

  updateComplaint(id: number, formData: FormData) {
  formData.append('_method', 'PUT');   // 🔥 IMPORTANT

  return this.http.post(
    `http://127.0.0.1:8000/api/complaints/${id}`,
    formData
  );
}
  
}
