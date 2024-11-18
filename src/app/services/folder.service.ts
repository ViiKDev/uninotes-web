import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private baseUrl: string = 'http://localhost:5023/api/folders'
  private userId: number = 0;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = Number(this.auth.getUserId());
  }

  getAllFolders() {
    return this.http.get(`${this.baseUrl}/${this.userId}/all`)
  }
  getFolderById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  createFolder(folder: any) {
    return this.http.post(`${this.baseUrl}/${this.userId}`, folder);
  }
  updateFolder(id: number, folder: any) {
    return this.http.put(`${this.baseUrl}/${id}`, folder)
  }
  deleteFolder(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
