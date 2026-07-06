import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { COURSE_LIST } from '../../core/services/course-data.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedFilter = signal('all');

  courses = COURSE_LIST;

  filteredCourses = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.courses;
    return this.courses.filter(c => c.category === filter);
  });

  setFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
