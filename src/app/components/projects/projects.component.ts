import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  image?: string;
}

interface VideoModalState {
  isOpen: boolean;
  videoUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('initial => visible', animate('0.8s ease-in'))
    ]),
    trigger('cardAnimation', [
      state('initial', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('0.5s {{delay}}s ease-out')),
    ])
  ]
})
export class ProjectsComponent implements OnInit, AfterViewChecked {
  animationState = 'initial';
  videoModal: VideoModalState = {
    isOpen: false,
    videoUrl: ''
  };
  
  sanitizedVideoUrl: SafeResourceUrl = '';
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;
  
  projects: Project[] = [
    {
      name: 'TurathAI',
      description: 'AI-powered cultural tourism platform promoting Tunisia\'s heritage sites with interactive maps and personalized recommendations. Deployed on private cloud infrastructure using Docker, Ansible, and Kubernetes.',
      technologies: ['Java', 'Angular', 'MySQL', 'Docker', 'Kubernetes', 'Ansible'],
      demoLink: '/assets/videos/TurathAI-Demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/TurathAI-Frontend',
      image: '/assets/images/projects/turathAI.png'
    },
    {
      name: 'MatchMate',
      description: 'Sports facility booking system with a JavaFX desktop client and Symfony web version, improving reservation efficiency with relational database integration. Created a web version using Symfony framework, making MatchMate accessible across different devices for a seamless experience.',
      technologies: ['JavaFX', 'Symfony', 'MySQL'],
      demoLink: '/assets/videos/matchmate-demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/MatchMate-Symfony',
      image: '/assets/images/projects/matchmate.jpg'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Trigger animations after component initialized
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
  }
  
  ngAfterViewChecked(): void {
    // Check if video player should be playing
    if (this.videoModal.isOpen && this.videoPlayerRef) {
      // Try to play the video
      setTimeout(() => {
        const videoElement = this.videoPlayerRef.nativeElement;
        videoElement.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }, 300);
    }
  }
  
  openVideoDemo(videoUrl: string): void {
    this.videoModal = {
      isOpen: true,
      videoUrl: videoUrl
    };
    // Sanitize the URL for Angular security
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  closeVideoModal(): void {
    this.videoModal = {
      isOpen: false,
      videoUrl: ''
    };
    // Re-enable scrolling
    document.body.style.overflow = '';
  }
}