import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveApiUrl } from 'src/app/_helpers/runtime-config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = resolveApiUrl();
  
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.API_URL}/student-profile`);
  }
}
