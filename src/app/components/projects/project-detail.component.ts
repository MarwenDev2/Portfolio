import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PROJECTS, ProjectItem } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectItem | null = null;
  projectIndex: number | null = null;
  sanitizedDemoUrl: SafeResourceUrl | null = null;
  sanitizedPromoUrl: SafeResourceUrl | null = null;
  currentImageIndex = 0;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const index = parseInt(id, 10);
    if (isNaN(index) || index < 0 || index >= PROJECTS.length) return;

    this.projectIndex = index;
    this.project = PROJECTS[index];

    if (this.project?.promoVideo) {
      const normalizedPromo = this.normalizeVideoUrl(this.project.promoVideo);
      this.sanitizedPromoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(normalizedPromo);
    }

    if (this.project?.demoLink) {
      const normalized = this.normalizeVideoUrl(this.project.demoLink);
      this.sanitizedDemoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(normalized);
    }

    // Ensure the detail page loads at the top (fixes routing scroll-to-footer bug)
    try {
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
    } catch (e) {
      // fallback for environments without window
      try { document.documentElement.scrollTop = 0; } catch {}
    }
  }

  normalizeVideoUrl(url: string): string {
    if (!url) return url;

    // Google Drive preview normalization
    const driveFileMatch = url.match(/(?:drive\.google\.com\/file\/d\/|id=)([a-zA-Z0-9_-]+)/i);
    if (driveFileMatch?.[1]) {
      return `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`;
    }

    return url;
  }

  isDriveLink(url?: string): boolean {
    return !!url && /drive\.google\.com/i.test(url);
  }

  // Carousel helpers
  prevImage(): void {
    if (!this.imageArray) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.imageArray.length) % this.imageArray.length;
  }

  nextImage(): void {
    if (!this.imageArray) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageArray.length;
  }

  get imageUrl(): string | null {
    if (this.project && this.project.image && !Array.isArray(this.project.image)) {
      return this.project.image as string;
    }
    return null;
  }

  get imageArray(): string[] | null {
    if (this.project && Array.isArray(this.project.image)) {
      return this.project.image as string[];
    }
    return null;
  }

  get isDemoVideo(): boolean {
    return !!this.project?.demoLink && (this.project!.demoLink as string).toLowerCase().endsWith('.mp4');
  }

  get isPromoVideo(): boolean {
    return !!this.project?.promoVideo && (this.project!.promoVideo as string).toLowerCase().endsWith('.mp4');
  }

  // Map tech names to icon classes (mirrors HomeComponent mapping)
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
}
