import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API_URL = 'http://127.0.0.1:8000/api';
  // API_URL = 'https://complaint-system-production-78d7.up.railway.app/api'
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  forgotPassword(data: any) {
    return this.http.post(`${this.API_URL}/forgot-password`, data);
  }

  studentRegister(data: any) {
    return this.http.post(`${this.API_URL}/student-register`, data);
  }
}
