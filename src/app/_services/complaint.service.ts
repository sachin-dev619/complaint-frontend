import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveApiUrl } from 'src/app/_helpers/runtime-config';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  API_URL = resolveApiUrl();

  constructor(private http: HttpClient) {}

  addComplaint(data: any) {
    return this.http.post(`${this.API_URL}/complaints`, data);
  }

  getMyComplaints() {
    return this.http.get(`${this.API_URL}/my-complaints`);
  }

  getComplaintById(id: number) {
    return this.http.get(`${this.API_URL}/complaints/${id}`);
  }

  getAllComplaints(
    page: number = 1,
    filters: { status?: string; priority?: string; search?: string } = {}
  ) {
    let params = new HttpParams()
      .set('page', String(page))
      .set('per_page', '10');

    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.priority) {
      params = params.set('priority', filters.priority);
    }
    if (filters.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<any>(`${this.API_URL}/all-complaints`, { params });
  }

  getDashboardStats() {
    return this.http.get<any>(`${this.API_URL}/admin/dashboard-stats`);
  }

  updateStatus(id: number, data: any) {
    return this.http.post(`${this.API_URL}/update-status/${id}`, data);
  }

  getCategories(all = false) {
    const params = all ? new HttpParams().set('all', '1') : undefined;
    return this.http.get(`${this.API_URL}/categories`, { params });
  }

  getSubcategoriesByCategory(id: number) {
    return this.http.get(`${this.API_URL}/subcategories/${id}`);
  }

  updateComplaint(id: number, formData: FormData) {
    formData.append('_method', 'PUT');

    return this.http.post(
      `${this.API_URL}/complaints/${id}`,
      formData
    );
  }
}
