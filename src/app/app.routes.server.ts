import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'course/:id', renderMode: RenderMode.Server },
  { path: 'learning/:courseId/:lessonId', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
