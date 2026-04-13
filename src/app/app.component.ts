import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { ChatComponent } from './components/chat/chat.component';
import { DocumentModel } from './models/document.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UploadComponent, ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doc_qa_frontend';
  uploadedDocument:DocumentModel | null = null;

  onDocumentUploaded(document: DocumentModel) {
    this.uploadedDocument = document;
  }

  onNewDocument() {
    this.uploadedDocument = null;
  }
}
