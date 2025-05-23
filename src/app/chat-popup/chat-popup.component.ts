import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent implements AfterViewChecked {
  isOpen = false;
  messages: { sender: string, content: string }[] = [
    { sender: 'Hỗ trợ', content: 'Chào bạn! Chúng tôi có thể giúp gì cho bạn?' }
  ];
  newMessage = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Bạn', content: this.newMessage });
      this.newMessage = '';
      setTimeout(() => {
        this.messages.push({ sender: 'Hỗ trợ', content: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.' });
      }, 1000);
    }
  }

  ngAfterViewChecked() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}