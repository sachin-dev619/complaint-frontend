import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.API_URL}/${url}`);
  }

  post(url: string, data: any) {
    return this.http.post(`${this.API_URL}/${url}`, data);
  }

  put(url: string, data: any) {
    return this.http.put(`${this.API_URL}/${url}`, data);
  }

  delete(url: string) {
    return this.http.delete(`${this.API_URL}/${url}`);
  }
}
