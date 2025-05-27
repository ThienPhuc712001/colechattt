import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChatPopupComponent } from './custom-chat-popup.component';

describe('CustomChatPopupComponent', () => {
  let component: CustomChatPopupComponent;
  let fixture: ComponentFixture<CustomChatPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomChatPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomChatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
