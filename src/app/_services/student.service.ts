import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.API_URL}/student-profile`);
  }
}
