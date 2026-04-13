import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { DocumentModel } from '../../models/document.model';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Output() documentUploaded = new EventEmitter<DocumentModel>();

  isDragging = false;
  isUploading = false;
  error = '';
  constructor(private apiService: ApiService) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.uploadFile(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.uploadFile(file);
  }
  uploadFile(file: File) {
    if (!file.name.endsWith('.pdf')) {
      this.error = 'Only PDF files are allowed';
      return;
    }
    this.error = '';
    this.isUploading = true;

    this.apiService.uploadDocument(file).subscribe({
      next: (document: DocumentModel) => {
        this.isUploading = false;
        this.documentUploaded.emit(document);
      },
      error: (err) => {
        this.isUploading = false;
        this.error = err.error?.detail || 'Upload failed. Please try again.';
      }
    });
  }

}
