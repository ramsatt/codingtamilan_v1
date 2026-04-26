import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subject, BehaviorSubject, combineLatest, takeUntil, switchMap } from 'rxjs';
import { CourseDataService, Lesson, CourseMeta, Slide } from '../../core/services/course-data.service';
import { BlockRendererComponent } from './block-renderer/block-renderer.component';

export interface SidebarLesson extends CourseMeta {
  number: number;
  completed: boolean;
}

@Component({
  selector: 'app-lesson-viewer',
  imports: [RouterLink, BlockRendererComponent],
  templateUrl: './lesson-viewer.html',
  styleUrl: './lesson-viewer.css',
})
export class LessonViewer implements OnInit, OnDestroy {
  courseId = 'java';
  currentLessonId = 'intro';

  lesson: Lesson | null = null;
  lessons: SidebarLesson[] = [];
  loading = true;
  error = false;

  currentSlide = 0;
  sidebarOpen = false;

  readonly lang$ = new BehaviorSubject<'en' | 'ta'>('en');
  get lang(): 'en' | 'ta' { return this.lang$.value; }
  switchLang(lang: 'en' | 'ta'): void { if (this.lang$.value !== lang) this.lang$.next(lang); }

  private static readonly COURSE_META: Record<string, { title: string; icon: string }> = {
    java: { title: 'Java Masterclass', icon: 'fa-brands fa-java' },
    ai: { title: 'Artificial Intelligence', icon: 'fa-solid fa-brain' },
    'prompt-engineering': { title: 'Prompt Engineering', icon: 'fa-solid fa-wand-magic-sparkles' },
    python: { title: 'Python Mastery', icon: 'fa-brands fa-python' },
    typescript: { title: 'TypeScript Essentials', icon: 'fa-brands fa-js' },
    llm: { title: 'LLM Engineering', icon: 'fa-solid fa-microchip' },
    'node-js': { title: 'Node.js Masterclass', icon: 'fa-brands fa-node-js' },
    react: { title: 'React Complete Guide', icon: 'fa-brands fa-react' },
    'context-engineering': { title: 'Context Engineering', icon: 'fa-solid fa-layer-group' },
    javascript: { title: 'JS Bootcamp', icon: 'fa-brands fa-js' },
    html: { title: 'HTML Complete', icon: 'fa-brands fa-html5' },
  };

  get courseTitle(): string { return LessonViewer.COURSE_META[this.courseId]?.title ?? this.courseId; }
  get courseIcon(): string { return LessonViewer.COURSE_META[this.courseId]?.icon ?? 'fa-solid fa-book'; }

  private destroy$ = new Subject<void>();

  get totalSlides(): number { return this.lesson?.slides?.length ?? 0; }
  get currentSlideData(): Slide | null { return this.lesson?.slides?.[this.currentSlide] ?? null; }
  get slideDots(): unknown[] { return Array(this.totalSlides); }
  get slideProgressPercent(): number {
    return this.totalSlides > 0 ? ((this.currentSlide + 1) / this.totalSlides) * 100 : 0;
  }
  get progress(): number {
    const idx = this.lessons.findIndex(l => l.id === this.currentLessonId);
    return this.lessons.length > 0 ? Math.round(((idx + 1) / this.lessons.length) * 100) : 0;
  }
  get completedCount(): number {
    return this.lessons.filter(l => l.completed).length;
  }
  get prevLesson(): SidebarLesson | null {
    const idx = this.lessons.findIndex(l => l.id === this.currentLessonId);
    return idx > 0 ? this.lessons[idx - 1] : null;
  }
  get nextLesson(): SidebarLesson | null {
    const idx = this.lessons.findIndex(l => l.id === this.currentLessonId);
    return idx >= 0 && idx < this.lessons.length - 1 ? this.lessons[idx + 1] : null;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseData: CourseDataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.lang$]).pipe(
      takeUntil(this.destroy$),
      switchMap(([params, lang]) => {
        this.courseId = params.get('courseId') ?? 'java';
        this.currentLessonId = params.get('lessonId') ?? 'intro';
        this.currentSlide = 0;
        this.loading = true;
        this.error = false;

        return this.courseData.getLessonList(this.courseId, lang).pipe(
          switchMap(list => {
            this.updateLessonList(list);
            return this.courseData.getLesson(this.courseId, this.currentLessonId, lang);
          })
        );
      })
    ).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.loading = false;
        this.updateCompletedState();
      },
      error: (err) => {
        console.error('Error loading lesson:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private storageKey(): string {
    return `ct_completed_${this.courseId}`;
  }

  private loadCompleted(): Set<string> {
    if (!isPlatformBrowser(this.platformId)) return new Set();
    try {
      const raw = localStorage.getItem(this.storageKey());
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveCompleted(ids: Set<string>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.storageKey(), JSON.stringify([...ids]));
    } catch { /* quota */ }
  }

  markCurrentLessonDone(): void {
    const ids = this.loadCompleted();
    ids.add(this.currentLessonId);
    this.saveCompleted(ids);
    this.lessons = this.lessons.map(l => ({
      ...l,
      completed: ids.has(l.id),
    }));
  }

  private updateLessonList(list: CourseMeta[]): void {
    const ids = this.loadCompleted();
    // Also auto-mark all lessons before current as completed (backward compat)
    const currentIdx = list.findIndex(l => l.id === this.currentLessonId);
    list.slice(0, currentIdx).forEach(l => ids.add(l.id));
    this.saveCompleted(ids);
    this.lessons = list.map((l, i) => ({
      ...l,
      number: i + 1,
      completed: ids.has(l.id),
    }));
  }

  private updateCompletedState(): void {
    const ids = this.loadCompleted();
    this.lessons = this.lessons.map(l => ({
      ...l,
      completed: ids.has(l.id),
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.nextSlide();
    if (e.key === 'ArrowLeft') this.prevSlide();
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  goToSlide(index: number): void {
    this.currentSlide = index;
    if (index === this.totalSlides - 1) this.markCurrentLessonDone();
  }
  nextSlide(): void {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      if (this.currentSlide === this.totalSlides - 1) this.markCurrentLessonDone();
    }
  }
  prevSlide(): void { if (this.currentSlide > 0) this.currentSlide--; }

  navigateToLesson(id: string): void {
    this.markCurrentLessonDone();
    this.router.navigate(['/learning', this.courseId, id]);
    this.sidebarOpen = false;
  }

  isCurrentLesson(id: string): boolean {
    return this.currentLessonId === id;
  }

  toggleFullscreen(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById('presentation-area') as HTMLElement;
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
}
