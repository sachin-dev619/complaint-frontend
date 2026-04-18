import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.API_URL}/student-profile`);
  }
}
