import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl: string = 'http://localhost:5023/api/documents'
  private userId: number = 0;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = Number(this.auth.getUserId());
  }

  getAllDocuments() {
    return this.http.get(`${this.baseUrl}/${this.userId}/all`);
  }
  getDocumentById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  createDocument(document: any) {
    return this.http.post(`${this.baseUrl}/${this.userId}`, document);
  }
  updateDocument(id: number, document: any) {
    return this.http.put(`${this.baseUrl}/${id}`, document)
  }
  deleteDocument(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}