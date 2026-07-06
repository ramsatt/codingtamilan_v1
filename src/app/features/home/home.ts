import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { COURSE_LIST } from '../../core/services/course-data.service';
import { HtmlPlaygroundComponent } from '../lesson-viewer/playground/html-playground.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass, HtmlPlaygroundComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  defaultPlaygroundCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; text-align: center; padding-top: 2rem; }
    h1 { color: #f97316; }
    button { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Coding Tamilan</h1>
  <p>Edit this code in real-time!</p>
  <button onclick="alert('Welcome to the future!')">Click Me</button>
</body>
</html>`;

  selectedFilter = signal<'all' | 'frontend' | 'backend' | 'ai-ml' | 'database'>('all');

  courses = COURSE_LIST;

  filteredCourses = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.courses;
    return this.courses.filter(c => c.category === filter);
  });

  setFilter(filter: 'all' | 'frontend' | 'backend' | 'ai-ml' | 'database') {
    this.selectedFilter.set(filter);
  }
}
