import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  name: string;
  description: string;
  tags: string[];
  image?: string[] | string;
  demoLink?: string;
  githubLink?: string;
  promoVideo?: string;
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
    'Angular', 'React', 'Spring Boot', 'Java', 'Symfony',
    'Node.js', 'TypeScript', 'JavaScript', 'MySQL', 'PostgreSQL',
    'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'Jenkins',
    'GitHub Actions', 'Google Cloud', 'Linux'
  ];


  
  // Method to get the corresponding Font Awesome icon for a technology
  getTechIcon(tech: string): string {
    const iconMap: { [key: string]: string } = {
      'Angular': 'fab fa-angular',
      'React': 'fab fa-react',
      'Spring Boot': 'fas fa-leaf',
      'Java': 'fab fa-java',
      'Symfony': 'fab fa-symfony',
      'Node.js': 'fab fa-node-js',
      'JavaScript': 'fab fa-js',
      'TypeScript': 'fab fa-js',
      'PHP': 'fab fa-php',
      'MySQL': 'fas fa-database',
      'PostgreSQL': 'fas fa-database',
      'Docker': 'fab fa-docker',
      'Kubernetes': 'fas fa-dharmachakra',
      'Ansible': 'fas fa-network-wired',
      'Terraform': 'fas fa-cloud',
      'Jenkins': 'fas fa-cogs',
      'GitHub Actions': 'fab fa-github',
      'Google Cloud': 'fas fa-cloud',
      'Linux': 'fab fa-linux'
    };
    return iconMap[tech] || 'fas fa-code';
  }


  playingVideoIndex: number | null = null;

  togglePlay(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      videoElement.play().catch(err => console.warn('Playback error:', err));
    } else {
      videoElement.pause();
    }
  }


currentSlideIndex: { [key: number]: number } = {};

  featuredProjects: Project[] = [
    {
      name: 'United Services - HR Management System',
      description: 'A full-featured HR management platform built for United Services, enabling administrators to manage employees, departments, and service requests efficiently. The system integrates role-based access, cloud-ready architecture, and Dockerized deployment for scalability.',
      tags: ['Angular', 'Spring Boot', 'MySQL', 'Docker', 'REST API', 'Bootstrap'],
      image: [
        'assets/images/projects/rh1.png',
        'assets/images/projects/rh2.png',
        'assets/images/projects/rh3.png',
        'assets/images/projects/rh4.png',
        'assets/images/projects/rh5.png'
      ],
      demoLink: '/assets/videos/united-services-demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/UnitedService-Web'
    }
    ,
    {
      name: 'TurathAI',
      description: 'AI-powered cultural tourism platform promoting Tunisia\'s heritage sites with interactive maps and personalized recommendations. Deployed on private cloud infrastructure.',
      tags: ['Java', 'Angular', 'MySQL', 'Docker', 'Kubernetes', 'Ansible'],
      demoLink: '/assets/videos/TurathAi-DemoVideo.mp4',
      githubLink: 'https://github.com/MarwenDev2/TurathAI-Frontend',
      promoVideo: '/assets/videos/TurathAi-Commerical-Video.mp4'
      
    },
    {
      name: 'MatchMate',
      description: 'Sports facility booking system with a JavaFX desktop client and Symfony web version, improving reservation efficiency with relational database integration.',
      tags: ['JavaFX', 'Symfony', 'MySQL'],
      demoLink: '/assets/videos/matchmate-demo.mp4',
      githubLink: 'https://github.com/MarwenDev2/MatchMate-Symfony',
      image: [
        'assets/images/projects/matchmate1.jpg',
        'assets/images/projects/matchmate2.jpg',
        'assets/images/projects/matchmate3.png',
        'assets/images/projects/matchmate4.png',
        'assets/images/projects/matchmate5.jpg'
      ],
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);

    setInterval(() => {
    this.featuredProjects.forEach((project, i) => {
      if (Array.isArray(project.image)) {
        this.currentSlideIndex[i] = 
          ((this.currentSlideIndex[i] || 0) + 1) % project.image.length;
      }
    });
  }, 5000);
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
