import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'custom-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-chat-popup.component.html',
  styleUrls: ['./custom-chat-popup.component.scss']
})
export class CustomChatPopupComponent implements AfterViewChecked {
  isOpen = false;
  isMaximized = false;
  formSubmitted = false;
  firstName = '';
  email = '';
  phone = '';
  message = '';
  lastName = '';
  messages: { sender: string, content: string }[] = [
    { sender: 'Hỗ trợ', content: 'Xin chào, tôi là một trợ lý ảo của Cole. Hãy hỏi tôi thông tin liên quan tới Cole!' }
  ];
  newMessage = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.formSubmitted = false;
  }

  toogleMaximined(event) {
    console.log(12222);

    event.stopPropagation()
    this.isMaximized = !this.isMaximized;
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
        console.log("response", data);
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
  onSubmit() {
    this.formSubmitted = true;
    console.log('Form đã được gửi:', this.firstName, this.lastName);
  }
  async handleQuestion(value: number) {
    if (value === 1 || value === 3) {
      try {
        const response = await fetch('https://localhost:7132/api/OpenAi/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: "Giới thiệu về Cole" })
        });
        this.newMessage = '';
        const data = await response.json();
        console.log("response", data);
        let message = await data.reply;

        await this.messages.push({ sender: 'Hỗ trợ', content: message });
      } catch (error) {
        console.log(error);
      }
    } else {
      let message = "Bạn đang tìm hiểu giảng viên của khóa học nào để mình cung cấp thông tin phù hợp nhất."
      await this.messages.push({ sender: 'Hỗ trợ', content: message });
    }
  }

}