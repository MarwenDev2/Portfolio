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
        'Supported CI/CD infrastructure by troubleshooting deployment failures across Linux and Windows environments, analyzing pipeline logs, and resolving integration issues..',
        'Worked with Jenkins pipelines, automated test environments, and infrastructure components to investigate build, deployment, and configuration failures..',
        'Developed automation scripts using Python and Bash to simplify repetitive operational tasks, improve deployment workflows, and reduce manual intervention.',
        'Collaborated with software, integration, and infrastructure engineers to document deployment procedures, support system validation, and improve operational processes.'
      ],
      technologies: 'CI/CD, Git, Enterprise Development Practices, Cloud & DevOps Tooling, Linux, Windows, Python, Bash, Jenkins, Docker'
    },
    {
      date: 'Jul 2025 - Sep 2025',
      title: 'Cloud & DevOps Intern - United Services, Tunis',
      description: [
        'Developed and deployed a full-stack application using Spring Boot and Angular, integrating secure REST APIs and backend services.',
        'Designed and maintained Jenkins CI/CD pipelines to automate build, testing, and deployment processes.',
        'Configured Nginx as a reverse proxy and load balancer to optimize application performance and scalability.',
        'Deployed the application on a Linux VPS, managing server configurations, security settings, and monitoring tools.'
      ],
      technologies: 'Spring Boot, Angular, Docker, Nginx, Linux, VPS Deployment, Jenkins CI/CD, REST APIs, Git'
    },
    {
      date: 'Jul 2024 - Sep 2024',
      title: 'Engineering Internship - Inetum, Tunis',
      description: [
        'Customized and extended enterprise web platforms using WSO2 technologies, Java, and web development tools to meet client requirements.',
        'Developed and integrated RESTful APIs to enhance platform functionality and enable seamless data exchange between systems.'
      ],
      technologies: 'REST API, Node.js, React, WSO2 API Manager, WSO2 Identity Server, Java, Web Development'
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
