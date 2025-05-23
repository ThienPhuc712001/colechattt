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
    { sender: 'Hỗ trợ', content: 'Xin chào, tôi là một trợ lý ảo của Cole. Hãy hỏi tôi thông tin liên quan tới Cole!' }
  ];
  newMessage = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: '', content: this.newMessage });
      try {
        const response = await fetch('https://localhost:7132/api/OpenAi/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.newMessage })
      });
      this.newMessage = '';
      const data = await response.json();
      console.log("response" , data);
      let message = await data.reply;
       
       await this.messages.push({ sender: 'Hỗ trợ', content: message });
      } catch (error) {
        console.log(error);
        
      }

    }
  }

  ngAfterViewChecked() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}