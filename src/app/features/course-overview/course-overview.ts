import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CourseDataService, CourseMeta } from '../../core/services/course-data.service';

@Component({
  selector: 'app-course-overview',
  imports: [RouterLink],
  templateUrl: './course-overview.html',
  styleUrl: './course-overview.css',
})
export class CourseOverview implements OnInit {
  courseId = 'java';
  lessons: CourseMeta[] = [];
  
  private route = inject(ActivatedRoute);
  private courseData = inject(CourseDataService);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.courseId = params.get('id') ?? 'java';
        return this.courseData.getLessonList(this.courseId);
      })
    ).subscribe(list => {
      this.lessons = list;
    });
  }

  private static readonly COURSE_META: Record<string, { title: string; description: string }> = {
    java: {
      title: 'Java Masterclass: Zero to Hero',
      description: 'Master Java programming with real-world projects. Learn everything from JDK setup to complex OOP, Collections, and Multithreading.',
    },
    ai: {
      title: 'Artificial Intelligence: Zero to Production',
      description: 'Build deep intuition for AI. Covers machine learning, deep learning, transformers, LLMs, RAG, agents, and AI safety.',
    },
    'prompt-engineering': {
      title: 'Prompt Engineering Mastery',
      description: 'Master the art and science of prompting LLMs. Covers zero-shot, few-shot, chain-of-thought, RAG, agents, and production best practices.',
    },
    python: {
      title: 'Python Mastery',
      description: 'The complete Python developer course. Build real projects, automate tasks, and handle data with 36 hands-on lessons.',
    },
    typescript: {
      title: 'TypeScript Essentials',
      description: 'Master TypeScript from scratch. Covers types, interfaces, generics, decorators, and migrating existing JS projects.',
    },
    llm: {
      title: 'LLM Engineering',
      description: 'Build real apps with large language models. Covers APIs, RAG, vector DBs, fine-tuning, agents, and production deployment.',
    },
    'node-js': {
      title: 'Node.js Masterclass',
      description: 'Master server-side JavaScript with Node.js. Covers modules, Express, REST APIs, MongoDB, authentication, and deployment.',
    },
    react: {
      title: 'React Complete Guide',
      description: 'Master React from scratch. Covers hooks, context, routing, data fetching, performance, TypeScript, and testing.',
    },
    'context-engineering': {
      title: 'Context Engineering',
      description: 'Master the art of building context for LLMs. Covers context windows, memory, RAG, agentic systems, and production patterns.',
    },
    javascript: {
      title: 'JS Bootcamp: Zero to Advanced',
      description: 'Master JavaScript from the ground up. Covers ES6+, DOM, events, classes, async/await, Fetch API, and Web APIs across 23 hands-on lessons.',
    },
    html: {
      title: 'HTML Complete',
      description: 'Learn HTML from the ground up. Covers elements, forms, tables, semantic HTML, media, responsive design, and more.',
    },
  };

  get courseTitle(): string {
    return CourseOverview.COURSE_META[this.courseId]?.title ?? this.courseId;
  }

  get courseDescription(): string {
    return CourseOverview.COURSE_META[this.courseId]?.description ?? '';
  }
}
