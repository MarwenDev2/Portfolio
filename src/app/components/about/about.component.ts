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

  experiences = [
    {
      date: 'Apr 2026 – Present',
      company: 'Airbus Defence and Space',
      location: 'Germany',
      role: 'DevOps Engineer Intern',
      logo: 'assets/images/airbus-logo.png',
      description: [
        'Administer and maintain Linux-based infrastructure and CI/CD platforms used by engineering teams in complex aerospace environments.',
        'Develop Python and Bash automation scripts for recurring operational workflows, reducing manual effort and improving platform reliability.',
        'Investigate pipeline and runtime failures end-to-end, then feed fixes back into deployment procedures and documentation used by software and infrastructure teams.',
        'Work within security-sensitive aerospace development processes, adhering to rigorous quality, documentation, and engineering standards.'
      ],
      technologies: ['Linux', 'Python', 'Bash', 'C/C++', 'Git', 'CI/CD', 'Docker', 'Jenkins', 'Software Integration']
    },
    {
      date: 'Jul 2025 – Sep 2025',
      company: 'United Services',
      location: 'Tunis',
      role: 'DevOps Intern',
      logo: 'assets/images/unitedservices-logo.png',
      description: [
        'Developed a full-stack application using Spring Boot and Angular, delivering an end-to-end product from backend services to user interface.',
        'Administered Linux environments and containerized the application using Docker to improve portability and deployment consistency.',
        'Worked on deployment workflows and infrastructure setup for a production-ready internal application in a team-based environment.'
      ],
      technologies: ['TypeScript (Angular)', 'Java (Spring Boot)', 'Docker', 'Linux', 'Git', 'Jenkins', 'REST APIs']
    },
    {
      date: 'Jul 2024 – Sep 2024',
      company: 'Inetum',
      location: 'Tunis',
      role: 'Engineering Intern',
      logo: 'assets/images/inetum-logo.png',
      description: [
        'Developed a custom Java mediator for WSO2 to generate authentication tokens with configurable expiration policies, packaged and deployed as a Docker image.',
        'Extended enterprise integration platforms (Java, WSO2) to client-specific requirements, contributing to API integration work and backend troubleshooting.',
        'Collaborated with senior engineers on integration issues and platform extensions for enterprise environments.'
      ],
      technologies: ['Java', 'WSO2 Micro Integrator', 'JWT', 'REST APIs', 'Docker', 'API Integration']
    }
  ];

  skillGroups = [
    {
      title: 'Cloud & Infrastructure',
      icon: 'fas fa-cloud',
      items: [
        { name: 'AWS', icon: 'fa-brands fa-aws', color: '#ff9900' },
        { name: 'Terraform', icon: 'fas fa-server', color: '#7b61ff' },
        { name: 'Ansible', icon: 'fas fa-cogs', color: '#ff6b35' },
        { name: 'OpenStack', icon: 'fas fa-layer-group', color: '#4ecdc4' },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
        { name: 'Kubernetes', icon: 'fas fa-dharmachakra', color: '#326ce5' },
        { name: 'Jenkins', icon: 'fas fa-code-branch', color: '#d33834' },
        { name: 'CI/CD', icon: 'fas fa-route', color: '#00b894' }
      ]
    },
    {
      title: 'Languages & Frameworks',
      icon: 'fas fa-code',
      items: [
        { name: 'Java', icon: 'fab fa-java', color: '#ea7d2f' },
        { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
        { name: 'Bash', icon: 'fas fa-terminal', color: '#00a7e1' },
        { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#7ccf9d' },
        { name: 'Angular', icon: 'fab fa-angular', color: '#dd1b16' },
        { name: 'Symfony', icon: 'fab fa-symfony', color: '#000000' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777bb3' },
        { name: 'C / C++', icon: 'fas fa-microchip', color: '#00bcd4' }
      ]
    },
    {
      title: 'Monitoring & Security',
      icon: 'fas fa-shield-alt',
      items: [
        { name: 'Prometheus', icon: 'fas fa-chart-line', color: '#e6522c' },
        { name: 'Grafana', icon: 'fas fa-chart-bar', color: '#f2b93b' },
        { name: 'IAM', icon: 'fas fa-user-shield', color: '#2ecc71' },
        { name: 'RBAC', icon: 'fas fa-lock', color: '#0075ff' },
        { name: 'Network Policies', icon: 'fas fa-network-wired', color: '#6c5ce7' },
        { name: 'Secrets Management', icon: 'fas fa-key', color: '#f39c12' },
        { name: 'Linux', icon: 'fab fa-linux', color: '#000000' },
        { name: 'REST APIs', icon: 'fas fa-plug', color: '#00b894' }
      ]
    },
    {
      title: 'Databases & Tools',
      icon: 'fas fa-database',
      items: [
        { name: 'MySQL', icon: 'fas fa-database', color: '#00758f' },
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
        { name: 'WSO2', icon: 'fas fa-cubes', color: '#ff8a00' },
        { name: 'JWT', icon: 'fas fa-fingerprint', color: '#5b6cff' },
        { name: 'Docker Compose', icon: 'fas fa-boxes', color: '#1d63ed' },
        { name: 'Nginx', icon: 'fas fa-server', color: '#009639' },
        { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' },
        { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' }
      ]
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = window.location.origin + '/assets/documents/CVMarwenFeki.pdf';
    link.download = 'CV-MarwenFeki.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
