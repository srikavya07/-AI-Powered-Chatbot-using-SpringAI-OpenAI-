import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ChatbotComponent } from './app/chatbot/chatbot.component';

bootstrapApplication(ChatbotComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
