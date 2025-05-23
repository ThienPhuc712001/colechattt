import { Component } from '@angular/core';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatPopupComponent], // Nhập ChatPopupComponent
  template: '<app-chat-popup></app-chat-popup>'
})
export class AppComponent {
  title = 'cole-chat';
}