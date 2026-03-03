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
      date: 'Apr 2026 - Present',
      title: 'Software Engineering Intern - Airbus, Germany',
      description: [
        'Contributing to enterprise-level software development within a structured aerospace environment.',
        'Supporting development workflows, automation pipelines, and system optimization initiatives.',
        'Collaborating in agile teams while adhering to high standards of code quality, documentation, and reliability.'
      ],
      technologies: 'CI/CD, Git, Enterprise Development Practices, Cloud & DevOps Tooling'
    },
    {
      date: 'Jul 2025 - Sep 2025',
      title: 'Cloud & DevOps Intern - United Services, Tunis',
      description: [
        'Developed and deployed a full HR management system using Spring Boot and Angular on a private VPS.',
        'Automated deployment with Docker Compose, Nginx reverse proxy with TLS, and CI/CD optimization.'
      ],
      technologies: 'Spring Boot, Angular, Docker, Nginx, Linux, VPS Deployment'
    },
    {
      date: 'Jul 2024 - Sep 2024',
      title: 'Engineering Internship - Inetum, Tunis',
      description: [
        'Customized the WSO2 Developer Portal and API Marketplace to align with enterprise branding standards.'
      ],
      technologies: 'REST API, Node.js, React, WSO2 API Manager'
    },
    {
      date: 'Feb 2023 - Jun 2023',
      title: 'Web Development Intern - Unilog, Sfax',
      description: [
        'Developed MeetWise, a meeting scheduling web app that allows users to set meeting slots, send invitations, and manage responses interactively.'
      ],
      technologies: 'Angular, Node.js, MySQL'
    }
  ];

  ngOnInit(): void {
    // Trigger animations after component initialized
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
  }
  
  downloadCV(): void {
    // Create a direct link to the CV file with absolute URL
    const link = document.createElement('a');
    link.href = window.location.origin + '/assets/documents/CVMarwenFeki.pdf';
    link.download = 'CV-MarwenFeki.pdf'; // Rename the downloaded file
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Programmatically click the link to trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
