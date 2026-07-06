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

  get whatYouWillLearn(): string[] {
    const course = COURSE_LIST.find(c => c.id === this.courseId);
    return course?.whatYouWillLearn ?? [
      `Master the fundamentals of ${this.courseTitle}.`,
      'Build real-world projects and interactive applications.',
      'Prepare for technical interviews with dedicated practice questions.',
      'Understand best practices and modern development techniques.',
      'Develop problem-solving skills through hands-on coding challenges.'
    ];
  }

  get requirements(): string[] {
    const course = COURSE_LIST.find(c => c.id === this.courseId);
    return course?.requirements ?? [
      'No prior programming experience required.',
      'A computer with internet access.',
      'Willingness to learn and practice interactively.'
    ];
  }

  get longDescription(): string[] {
    const course = COURSE_LIST.find(c => c.id === this.courseId);
    return course?.longDescription ?? [
      `Welcome to the ${this.courseTitle}. This course is designed to take you from a complete beginner to a confident developer.`,
      'Our interactive lessons provide instant feedback, allowing you to learn by doing. Jump right into the code and see your results immediately!'
    ];
  }

  get codeSnippet(): string {
    const course = COURSE_LIST.find(c => c.id === this.courseId);
    return course?.codeSnippet ?? `function startCourse() {
  console.log("Let's master ${this.courseTitle}!");
  return true;
}`;
  }
}
