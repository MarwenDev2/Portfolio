import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('{{delay}}s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0.2 } })
    ])
  ]
})
export class ContactComponent {
  animationState = 'enter';

  // Contact form data
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Form submission state
  isSubmitting = false;
  formSubmitted = false;
  submitSuccess = false;
  errorMessage = '';

  sendEmail(): void {
    this.isSubmitting = true;
    this.formSubmitted = false;
    
    // Create mailto URL with form data
    const mailtoUrl = this.createMailtoLink();
    
    try {
      // Open email client with pre-filled data
      window.open(mailtoUrl, '_blank');
      
      // Show success message
      this.submitSuccess = true;
      this.errorMessage = '';
      setTimeout(() => {
        // Reset form after successful submission
        this.contactData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      }, 100);
    } catch (error) {
      // Handle any errors
      this.submitSuccess = false;
      this.errorMessage = 'Could not open email client. Please email me directly at marwenfeki214@gmail.com';
    } finally {
      this.isSubmitting = false;
      this.formSubmitted = true;
    }
  }

  private createMailtoLink(): string {
    const email = 'marwenfeki214@gmail.com';
    const subject = encodeURIComponent(`[Portfolio Contact] ${this.contactData.subject}`);
    const body = encodeURIComponent(
      `Name: ${this.contactData.name}\n\n` +
      `Email: ${this.contactData.email}\n\n` +
      `Message:\n${this.contactData.message}\n\n` +
      `Sent from your portfolio website`
    );
    
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
