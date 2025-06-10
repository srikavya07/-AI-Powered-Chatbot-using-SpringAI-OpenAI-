import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { sender: 'user' | 'bot', text: string }[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMessage });
    this.userInput = '';
    this.isLoading = true;

    this.http.post('http://localhost:8080/api/openai', userMessage, {
      responseType: 'text'
    }).subscribe({
      next: (response: string) => {
        this.messages.push({ sender: 'bot', text: response });
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Chat error:', error);
        this.messages.push({ sender: 'bot', text: 'Error: could not reach server.' });
        this.isLoading = false;
      }
    });
  }
}
