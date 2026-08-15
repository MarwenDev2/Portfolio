import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { PROJECTS, ProjectItem } from '../../data/projects.data';
type Project = ProjectItem & { _index?: number };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
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
export class HomeComponent implements OnInit {
  animationState = 'initial';
  
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

  featuredProjects = [] as Project[];

  constructor() {}

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
    // Populate featured projects from shared data (first two) and include global index
    this.featuredProjects = PROJECTS.map((p, idx) => ({ ...p, _index: idx })).slice(0, 2) as Project[];
  }

  // Demo modal removed — project details open in their own page
}