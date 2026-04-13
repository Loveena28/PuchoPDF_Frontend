import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerResponse,DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://pushpdf-backend.onrender.com/api';

  constructor(private http: HttpClient) { }

  uploadDocument(file: File): Observable<DocumentModel> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DocumentModel>(`${this.baseUrl}/documents/`, formData);
  }

  getDocuments(): Observable<DocumentModel[]> {
    return this.http.get<DocumentModel[]>(`${this.baseUrl}/documents/`);
  }

  askQuestion(documentId: string, question: string): Observable<AnswerResponse> {
    return this.http.post<AnswerResponse>(
      `${this.baseUrl}/documents/${documentId}/ask/`,
      { question }
    );
  }

  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/documents/${documentId}/`);
  }
}
