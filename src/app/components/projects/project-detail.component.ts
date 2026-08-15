import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
  sanitizedDemoUrl: any = null;
  currentImageIndex = 0;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const index = parseInt(id, 10);
    if (isNaN(index) || index < 0 || index >= PROJECTS.length) return;

    this.projectIndex = index;
    this.project = PROJECTS[index];

    if (this.project?.demoLink) {
      const normalized = this.normalizeVideoUrl(this.project.demoLink);
      this.sanitizedDemoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(normalized);
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
    return !!this.project?.demoLink && (this.project!.demoLink as string).endsWith('.mp4');
  }
}
