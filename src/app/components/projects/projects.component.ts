import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  repos?: {
    frontend?: string;
    backend?: string;
  };
  image?: string[] | string;
  promoVideo?: string;
  isRepoMenuOpen?: boolean;
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
    trigger('fadeInUp', [
      state('initial', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('500ms cubic-bezier(0.16, 1, 0.3, 1)'))
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
      name: 'Private Cloud Infrastructure & App Deployment',
      description: 'Engineered a production-grade private cloud infrastructure from scratch using OpenStack on 7 physical servers. Automated entire deployment lifecycle with Heat templates for VM provisioning and Ansible for Infrastructure-as-Code, deploying a resilient 4-node Kubernetes cluster. Successfully containerized and orchestrated a full-stack application (Spring Boot + Angular + MySQL) using 12+ Kubernetes manifests, implementing automated rolling updates and health checks that ensured 99%+ service availability and self-healing capabilities.',
      
      technologies: ['OpenStack', 'Kubernetes', 'Ansible', 'Docker', 'Spring Boot', 'Angular', 'MySQL', 'Heat Templates', 'Infrastructure-as-Code', 'Linux', 'Bash Scripting'],
      promoVideo: 'https://drive.google.com/uc?export=view&id=1P7ENrL93BSz1W54Mcfa_ES2OQR9ORRmL',
      demoLink: 'https://drive.google.com/uc?export=view&id=1mpNo1r0Dgdzie2J5L6n5BuyEHXyilaXJ',
      repos: {
        frontend: 'https://github.com/MarwenDev2/TurathAI-Frontend',
        backend: 'https://github.com/MarwenDev2/TurathAI-Backend'
      }
    },
    {
      name: 'United Services - HR Management System',
      description: 'Developed a comprehensive HR management platform using Spring Boot and Angular, deployed on a private VPS with Docker containerization. Implemented a multi-container setup with Docker Compose and configured Nginx reverse proxy with TLS termination, improving request routing efficiency by 25%. Automated backend deployment scripts on Linux servers, reducing manual deployment effort by over 30% while enhancing system stability and deployment reliability.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Docker', 'Docker Compose', 'Nginx', 'Linux', 'REST API', 'Bootstrap'],
      image: [
        'assets/images/projects/rh1.png',
        'assets/images/projects/rh2.png',
        'assets/images/projects/rh3.png',
        'assets/images/projects/rh4.png',
        'assets/images/projects/rh5.png'
      ],
      demoLink: 'https://drive.google.com/uc?export=view&id=1gFf5MxunGCiFg_zEFdo-8jVEFD8vAWUo',
      repos: {
        frontend: 'https://github.com/MarwenDev2/UnitedService-Web',
        backend: 'https://github.com/MarwenDev2/UnitedService-Backend'
      }
    },
    {
      name: 'MatchMate - Sports Facility Reservation System',
      description: 'Engineered a full-stack reservation system using Java/JavaFX for desktop and Symfony/PHP for web applications, reducing booking processing time by 40% through real-time availability updates. Designed and implemented a unified MySQL database schema supporting 500+ daily transactions with 99% data consistency. Applied Agile methodologies to deliver a production-ready system handling facility management, user authentication, and payment processing with comprehensive testing strategies.',
      technologies: ['Java', 'JavaFX', 'Symfony', 'PHP', 'MySQL', 'Agile Methodology', 'System Integration', 'Testing'],
      demoLink: 'https://drive.google.com/uc?export=view&id=1puWul_b_0_91oThe_nj5PtNcyPKiUXrL',
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

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isGoogleDriveVideoUrl(videoUrl: string): boolean {
    return !!videoUrl && /drive\.google\.com/i.test(videoUrl);
  }

  normalizeVideoUrl(videoUrl: string): string {
    if (!videoUrl) return '';

    const googleDriveFileMatch = videoUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
    if (googleDriveFileMatch?.[1]) {
      return `https://drive.google.com/file/d/${googleDriveFileMatch[1]}/preview`;
    }

    const googleDriveUcMatch = videoUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
    if (googleDriveUcMatch?.[1]) {
      return `https://drive.google.com/file/d/${googleDriveUcMatch[1]}/preview`;
    }

    return videoUrl;
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

  ngOnInit(): void {
  setTimeout(() => (this.animationState = 'visible'), 100);

  setInterval(() => {
    this.projects.forEach((project, i) => {
      if (Array.isArray(project.image)) {
        this.currentSlideIndex[i] =
          ((this.currentSlideIndex[i] || 0) + 1) % project.image.length;
      }
    });
  }, 5000);

  document.addEventListener('click', () => {
    this.closeAllRepoMenus();
  });
}

  toggleRepoMenu(project: Project, event: Event): void {
  event.stopPropagation();

  this.projects.forEach(p => {
    if (p !== project) p.isRepoMenuOpen = false;
  });

  project.isRepoMenuOpen = !project.isRepoMenuOpen;
}

closeAllRepoMenus(): void {
  this.projects.forEach(p => p.isRepoMenuOpen = false);
}
  
  ngAfterViewChecked(): void {
    if (!this.videoModal.isOpen || !this.videoPlayerRef?.nativeElement || !this.sanitizedVideoUrl) {
      return;
    }

    const videoElement = this.videoPlayerRef.nativeElement as HTMLVideoElement;
    const currentSource = videoElement.currentSrc || videoElement.src;
    const targetSource = this.normalizeVideoUrl(this.videoModal.videoUrl || '');

    if (targetSource && currentSource !== targetSource) {
      videoElement.src = targetSource;
      videoElement.load();
    }

    setTimeout(() => {
      if (!videoElement.paused && !videoElement.ended) {
        return;
      }

      videoElement.play().catch(error => {
        if (error?.name !== 'AbortError') {
          console.error('Error playing video:', error);
        }
      });
    }, 250);
  }
  
  openVideoDemo(videoUrl: string): void {
    const normalizedVideoUrl = this.normalizeVideoUrl(videoUrl);

    this.videoModal = {
      isOpen: true,
      videoUrl: normalizedVideoUrl
    };

    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(normalizedVideoUrl);
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