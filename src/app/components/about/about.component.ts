import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fadeIn', [
      state('initial', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('0.6s ease-in'))
    ]),
    trigger('slideIn', [
      state('initial', style({ opacity: 0, transform: 'translateX(-30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('initial => visible', animate('0.5s 0.3s ease-out'))
    ])
  ]
})
export class AboutComponent implements OnInit {
  animationState = 'initial';

  ngOnInit(): void {
    // Trigger animations after component initialized
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
  }
  
  downloadCV(): void {
    // Create a direct link to the CV file with absolute URL
    const link = document.createElement('a');
    link.href = window.location.origin + '/assets/documents/cv.pdf';
    link.download = 'Marwen_Feki_CV.pdf'; // Rename the downloaded file
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Programmatically click the link to trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
