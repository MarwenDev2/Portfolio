import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  name: string;
  description: string;
  tags: string[];
  image?: string;
  demoLink?: string;
  githubLink?: string;
}
interface VideoModalState {
  isOpen: boolean;
  videoUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterLink],
  animations: [
    trigger('fadeInUp', [
      state('initial', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('0.6s ease'))
    ]),
    trigger('slideIn', [
      state('initial', style({ opacity: 0, transform: 'translateX(50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('initial => visible', animate('0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),
    trigger('techIconAnimation', [
      state('initial', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('initial => visible', 
        animate('0.5s {{delay}}s ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
        { params: { delay: 0 } }
      )
    ]),
    trigger('projectCardAnimation', [
      state('initial', style({ opacity: 0, transform: 'translateY(40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', 
        animate('0.6s {{delay}}s ease', style({ opacity: 1, transform: 'translateY(0)' })),
        { params: { delay: 0 } }
      )
    ]),
    trigger('typewriterAnimation', [
      state('initial', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('initial => visible', [
        animate('0.4s', style({ opacity: 1 })),
        animate('1.5s', keyframes([
          style({ width: '0%', borderRight: '3px solid var(--primary)', offset: 0 }),
          style({ width: '100%', borderRight: '3px solid var(--primary)', offset: 0.9 }),
          style({ borderRight: 'transparent', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  animationState = 'initial';
  videoModal: VideoModalState = {
    isOpen: false,
    videoUrl: ''
  };
  sanitizedVideoUrl: SafeResourceUrl = '';
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;
  
  technologies: string[] = [
    'Angular', 'React JS', 'Java', 'Spring Boot', 'Symfony', 
    'Flutter', 'Docker', 'Kubernetes', 'Ansible', 'Terraform',
    'JavaScript', 'TypeScript', 'PHP', 'C#', 'MySQL'
  ];

  
  // Method to get the corresponding Font Awesome icon for a technology
  getTechIcon(tech: string): string {
    const iconMap: {[key: string]: string} = {
      'Angular': 'fab fa-angular',
      'React JS': 'fab fa-react',
      'Java': 'fab fa-java',
      'JavaScript': 'fab fa-js',
      'TypeScript': 'fab fa-js',
      'PHP': 'fab fa-php',
      'Docker': 'fab fa-docker',
      'C#': 'fab fa-microsoft',
      'MySQL': 'fas fa-database',
      'Kubernetes': 'fas fa-dharmachakra',
      'Ansible': 'fas fa-network-wired',
      'Terraform': 'fas fa-cloud',
      'Flutter': 'fas fa-mobile-alt',
      'Spring Boot': 'fas fa-leaf',
      'Symfony': 'fab fa-symfony'
    };
    
    return iconMap[tech] || '';
  }

  featuredProjects: Project[] = [
    {
      name: 'TurathAI',
      description: 'AI-powered cultural tourism platform promoting Tunisia\'s heritage sites with interactive maps and personalized recommendations. Deployed on private cloud infrastructure.',
      tags: ['Java', 'Angular', 'MySQL', 'Docker', 'Kubernetes', 'Ansible'],
      demoLink: '/assets/videos/TurathAI-Demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/TurathAI-Frontend',
      image: 'assets/images/projects/turathAI.png'
    },
    {
      name: 'MatchMate',
      description: 'Sports facility booking system with a JavaFX desktop client and Symfony web version, improving reservation efficiency with relational database integration.',
      tags: ['JavaFX', 'Symfony', 'MySQL'],
      demoLink: '/assets/videos/matchmate-demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/MatchMate-Symfony',
      image: 'assets/images/projects/matchmate.jpg'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
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
