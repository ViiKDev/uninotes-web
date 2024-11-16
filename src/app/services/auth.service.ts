import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5023/api/users'

  constructor(private http: HttpClient) { }

  login(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, userObj);
  }
  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }
}
