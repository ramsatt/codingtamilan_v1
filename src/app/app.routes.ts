import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CourseOverview } from './features/course-overview/course-overview';
import { LessonViewer } from './features/lesson-viewer/lesson-viewer';
import { SqlViewer } from './features/sql-viewer/sql-viewer';
import { CssViewer } from './features/css-viewer/css-viewer';
import { JsViewer } from './features/js-viewer/js-viewer';
import { Certificate } from './features/certificate/certificate';

export const routes: Routes = [
  { path: '', component: Home, title: 'Coding Tamilan - Learn to Code' },
  { path: 'course/:id', component: CourseOverview },
  { path: 'sql/:lessonId', component: SqlViewer },
  { path: 'css/:lessonId', component: CssViewer },
  { path: 'js/:lessonId', component: JsViewer },
  { path: 'learning/:courseId/:lessonId', component: LessonViewer },
  { path: 'certificate/:courseId', component: Certificate },
  { path: '**', redirectTo: '' }
];
