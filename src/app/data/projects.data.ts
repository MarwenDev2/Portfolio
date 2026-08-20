export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  logo?: string;
  tags?: string[];
  demoLink?: string;
  githubLink?: string;
  repos?: { frontend?: string; backend?: string };
  image?: string[] | string;
  promoVideo?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'Private Cloud Infrastructure & App Deployment',
    description: 'Engineered a production-grade private cloud infrastructure from scratch using OpenStack on 7 physical servers. Automated entire deployment lifecycle with Heat templates for VM provisioning and Ansible for Infrastructure-as-Code, deploying a resilient 4-node Kubernetes cluster. Successfully containerized and orchestrated a full-stack application (Spring Boot + Angular + MySQL) using 12+ Kubernetes manifests, implementing automated rolling updates and health checks that ensured 99%+ service availability and self-healing capabilities.',
    technologies: ['OpenStack', 'Kubernetes', 'Ansible', 'Docker', 'Spring Boot', 'Angular', 'MySQL', 'Heat Templates', 'Infrastructure-as-Code', 'Linux', 'Bash Scripting'],
    tags: ['OpenStack', 'Kubernetes', 'Ansible', 'Docker'],
    promoVideo: 'https://drive.google.com/uc?export=view&id=13hafumck5k3cn1BbqbR22dK3JDendnSB',
    logo: 'assets/images/turathai-logo.png',
    demoLink: 'https://drive.google.com/uc?export=view&id=13U3ndE3_M-Tlmo30aJ5-IkVC1l7pFMqy',
    repos: { frontend: 'https://github.com/MarwenDev2/TurathAI-Frontend', backend: 'https://github.com/MarwenDev2/TurathAI-Backend' },
    image: ['assets/images/projects/turathAI.png']
  },
  {
    name: 'United Services - HR Management System',
    description: 'Developed a comprehensive HR management platform using Spring Boot and Angular, deployed on a private VPS with Docker containerization. Implemented a multi-container setup with Docker Compose and configured Nginx reverse proxy with TLS termination, improving request routing efficiency by 25%. Automated backend deployment scripts on Linux servers, reducing manual deployment effort by over 30% while enhancing system stability and deployment reliability.',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'Docker', 'Docker Compose', 'Nginx', 'Linux', 'REST API', 'Bootstrap'],
    tags: ['Angular', 'Spring Boot', 'Docker', 'MySQL'],
    logo: 'assets/images/unitedservices-logo.png',
    image: [
      'assets/images/projects/rh1.png',
      'assets/images/projects/rh2.png',
      'assets/images/projects/rh3.png',
      'assets/images/projects/rh4.png',
      'assets/images/projects/rh5.png'
    ],
    demoLink: 'https://drive.google.com/uc?export=view&id=1Tl1w8L1y1tkqGeUbtffanBiBk1ZJHDuH',
    repos: { frontend: 'https://github.com/MarwenDev2/UnitedService-Web', backend: 'https://github.com/MarwenDev2/UnitedService-Backend' }
  },
  {
    name: 'MatchMate - Sports Facility Reservation System',
    description: 'Engineered a full-stack reservation system using Java/JavaFX for desktop and Symfony/PHP for web applications, reducing booking processing time by 40% through real-time availability updates. Designed and implemented a unified MySQL database schema supporting 500+ daily transactions with 99% data consistency. Applied Agile methodologies to deliver a production-ready system handling facility management, user authentication, and payment processing with comprehensive testing strategies.',
    technologies: ['Java', 'JavaFX', 'Symfony', 'PHP', 'MySQL', 'Agile Methodology', 'System Integration', 'Testing'],
    tags: ['Java', 'Symfony', 'MySQL'],
    demoLink: 'https://drive.google.com/uc?export=view&id=1VVc3794I7tpCeXqihJw6FtbHdDeXZOAB',
    logo: 'assets/images/matchmate-logo.png',
    githubLink: 'https://github.com/MarwenDev2/MatchMate-Symfony',
    image: [
      'assets/images/projects/matchmate1.jpg',
      'assets/images/projects/matchmate2.jpg',
      'assets/images/projects/matchmate3.png',
      'assets/images/projects/matchmate4.png',
      'assets/images/projects/matchmate5.jpg'
    ]
  }
];
