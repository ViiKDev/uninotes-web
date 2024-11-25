import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) { }

  login(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, userObj);
  }
  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
  }
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token')
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  getUserId() {
    return localStorage.getItem('userId')
  }
}
