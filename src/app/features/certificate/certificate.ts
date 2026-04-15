import { Component, OnInit, inject, signal, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

const COURSE_TITLES: Record<string, string> = {
  java: 'Java Masterclass',
  javascript: 'JS Bootcamp',
  css: 'CSS Styling Pro',
  python: 'Python Mastery',
  sql: 'SQL Complete',
  ai: 'Artificial Intelligence',
  'prompt-engineering': 'Prompt Engineering',
  typescript: 'TypeScript Essentials',
  llm: 'LLM Engineering',
  'node-js': 'Node.js Masterclass',
  react: 'React Complete Guide',
  'context-engineering': 'Context Engineering',
  html: 'HTML Complete',
};

@Component({
  selector: 'app-certificate',
  imports: [RouterLink],
  templateUrl: './certificate.html',
  styleUrl: './certificate.css',
})
export class Certificate implements OnInit {
  @ViewChild('certEl') certEl!: ElementRef<HTMLDivElement>;

  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  courseId = signal('');
  courseTitle = signal('');
  studentName = signal('Your Name');
  isDownloading = signal(false);

  completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('courseId') ?? '';
      this.courseId.set(id);
      this.courseTitle.set(COURSE_TITLES[id] ?? id);
    });
  }

  updateName(event: Event) {
    const val = (event.target as HTMLInputElement).value.trim();
    this.studentName.set(val || 'Your Name');
  }

  async downloadPNG() {
    if (!isPlatformBrowser(this.platformId) || this.isDownloading()) return;
    this.isDownloading.set(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(this.certEl.nativeElement, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `${this.courseId()}-certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      this.isDownloading.set(false);
    }
  }

  async downloadPDF() {
    if (!isPlatformBrowser(this.platformId) || this.isDownloading()) return;
    this.isDownloading.set(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(this.certEl.nativeElement, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1080, 1080] });
      pdf.addImage(imgData, 'PNG', 0, 0, 1080, 1080);
      pdf.save(`${this.courseId()}-certificate.pdf`);
    } finally {
      this.isDownloading.set(false);
    }
  }
}
