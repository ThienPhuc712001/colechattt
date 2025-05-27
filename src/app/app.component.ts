import { Component } from '@angular/core';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { CustomChatPopupComponent } from './custom-chat-popup/custom-chat-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [ChatPopupComponent], // Nhập ChatPopupComponent
  imports : [CustomChatPopupComponent],
  // template: '<app-chat-popup></app-chat-popup>'
  template: '<custom-chat-popup></custom-chat-popup>'
})
export class AppComponent {
  title = 'cole-chat';
}