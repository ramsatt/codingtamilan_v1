import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CourseDataService, CourseMeta, COURSE_LIST } from '../../core/services/course-data.service';

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

  get courseTitle(): string {
    return COURSE_LIST.find(c => c.id === this.courseId)?.title ?? this.courseId;
  }

  get courseDescription(): string {
    return COURSE_LIST.find(c => c.id === this.courseId)?.description ?? '';
  }
}
