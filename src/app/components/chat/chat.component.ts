import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { DocumentModel,AnswerResponse, Source } from '../../models/document.model';
import { FormsModule } from '@angular/forms';

interface Message {
  type: 'user' | 'ai';
  content: string;
  sources?: Source[];
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() document!: DocumentModel;
  @Output() newDocument = new EventEmitter<void>();

  messages: Message[] = [];
  question = '';
  isLoading = false;
  error = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.messages.push({
      type: 'ai',
      content: `I've analysed **${this.document.name}** (${this.document.page_count} pages). Ask me anything about it!`,
      timestamp: new Date()
    });
  }
  askQuestion() {
    if (!this.question.trim() || this.isLoading) return;

    const userQuestion = this.question.trim();
    this.question = '';
    this.error = '';

    this.messages.push({
      type: 'user',
      content: userQuestion,
      timestamp: new Date()
    });

    this.isLoading = true;
    this.scrollToBottom();

    this.apiService.askQuestion(this.document.id, userQuestion).subscribe({
      next: (response: AnswerResponse) => {
        this.isLoading = false;
        this.messages.push({
          type: 'ai',
          content: response.answer,
          sources: response.sources,
          timestamp: new Date()
        });
        this.scrollToBottom();
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.detail || 'Something went wrong. Please try again.';
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.askQuestion();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onNewDocument() {
    this.newDocument.emit();
  }

}
