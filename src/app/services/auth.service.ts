import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getLoggedInStatus() {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) { }

  login(userObj: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, userObj);
  }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
