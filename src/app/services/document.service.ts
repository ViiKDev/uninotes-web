import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl: string = 'http://localhost:5023/api/documents'

  constructor(private http: HttpClient) { }

  getAllDocuments() {
    return this.http.get(`${this.baseUrl}/1`)
  }
  getDocumentById(id: number) { }
  createDocument() { }
  updateDocument(id: number) { }
  deleteDocument(id: number) { }
}
