import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveApiUrl } from 'src/app/_helpers/runtime-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = resolveApiUrl();

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
