import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://127.0.0.1:8000/api';

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
